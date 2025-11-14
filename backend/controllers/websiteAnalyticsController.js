// ============================================================================
// WEBSITE ANALYTICS CONTROLLER
// ============================================================================
// Fetch website analytics data from Google Analytics Data API

const { analyticsDataClient, propertyId } = require('../config/googleAnalytics');

/**
 * Get overall website statistics
 * - Total page views (all time)
 * - Unique visitors
 * - Active users today
 * - Average session duration
 */
exports.getWebsiteStats = async (req, res) => {
  try {
    if (!propertyId) {
      return res.status(500).json({
        success: false,
        message: 'Google Analytics not configured'
      });
    }

    // Fetch multiple metrics in parallel
    const [totalViewsResponse, last30DaysResponse, todayResponse] = await Promise.all([
      // Total views (last 365 days as "all time" approximation)
      analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate: '365daysAgo', endDate: 'today' }],
        metrics: [
          { name: 'screenPageViews' },
          { name: 'totalUsers' },
          { name: 'averageSessionDuration' }
        ]
      }),

      // Last 30 days for growth calculation
      analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [
          { startDate: '30daysAgo', endDate: 'yesterday' },
          { startDate: '60daysAgo', endDate: '31daysAgo' }
        ],
        metrics: [{ name: 'totalUsers' }]
      }),

      // Today's active users
      analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate: 'today', endDate: 'today' }],
        metrics: [{ name: 'activeUsers' }]
      })
    ]);

    // Parse total stats
    const totalRow = totalViewsResponse[0].rows?.[0];
    const totalViews = parseInt(totalRow?.metricValues?.[0]?.value || '0');
    const uniqueVisitors = parseInt(totalRow?.metricValues?.[1]?.value || '0');
    const avgSessionDuration = parseFloat(totalRow?.metricValues?.[2]?.value || '0');

    // Parse growth data
    const growthRow = last30DaysResponse[0].rows?.[0];
    const currentPeriodUsers = parseInt(growthRow?.metricValues?.[0]?.value || '0');
    const previousPeriodUsers = parseInt(growthRow?.metricValues?.[1]?.value || '1');
    const weeklyGrowth = Math.round(((currentPeriodUsers - previousPeriodUsers) / previousPeriodUsers) * 100);

    // Parse today's data
    const todayRow = todayResponse[0].rows?.[0];
    const todayActive = parseInt(todayRow?.metricValues?.[0]?.value || '0');

    // Format session duration
    const minutes = Math.floor(avgSessionDuration / 60);
    const seconds = Math.floor(avgSessionDuration % 60);
    const avgSessionFormatted = `${minutes}m ${seconds}s`;

    res.status(200).json({
      success: true,
      data: {
        totalViews,
        uniqueVisitors,
        avgSessionDuration: avgSessionFormatted,
        todayActive,
        weeklyGrowth
      }
    });

  } catch (error) {
    console.error('❌ Error fetching website stats from GA:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch analytics data',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Get daily statistics for chart visualization
 * Returns views and users per day for the specified number of days
 */
exports.getDailyStats = async (req, res) => {
  try {
    if (!propertyId) {
      return res.status(500).json({
        success: false,
        message: 'Google Analytics not configured'
      });
    }

    const days = parseInt(req.query.days) || 7;

    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
      dimensions: [{ name: 'date' }],
      metrics: [
        { name: 'screenPageViews' },
        { name: 'totalUsers' }
      ],
      orderBys: [{ dimension: { dimensionName: 'date' }, desc: false }]
    });

    const dailyData = response.rows?.map(row => {
      const dateStr = row.dimensionValues?.[0]?.value || '';
      // Format: YYYYMMDD -> parse to readable date
      const year = dateStr.substring(0, 4);
      const month = dateStr.substring(4, 6);
      const day = dateStr.substring(6, 8);
      const date = new Date(`${year}-${month}-${day}`);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

      return {
        date: dateStr,
        day: dayName,
        views: parseInt(row.metricValues?.[0]?.value || '0'),
        users: parseInt(row.metricValues?.[1]?.value || '0')
      };
    }) || [];

    res.status(200).json({
      success: true,
      data: dailyData
    });

  } catch (error) {
    console.error('❌ Error fetching daily stats from GA:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch daily analytics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Get top pages by views
 */
exports.getTopPages = async (req, res) => {
  try {
    if (!propertyId) {
      return res.status(500).json({
        success: false,
        message: 'Google Analytics not configured'
      });
    }

    const limit = parseInt(req.query.limit) || 5;

    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'pagePathPlusQueryString' }],
      metrics: [{ name: 'screenPageViews' }],
      orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
      limit
    });

    const totalViews = response.rows?.reduce((sum, row) => {
      return sum + parseInt(row.metricValues?.[0]?.value || '0');
    }, 0) || 1;

    const topPages = response.rows?.map(row => {
      const views = parseInt(row.metricValues?.[0]?.value || '0');
      return {
        page: row.dimensionValues?.[0]?.value || '/',
        views,
        percentage: Math.round((views / totalViews) * 100)
      };
    }) || [];

    res.status(200).json({
      success: true,
      data: topPages
    });

  } catch (error) {
    console.error('❌ Error fetching top pages from GA:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch top pages',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Get device breakdown
 */
exports.getDeviceStats = async (req, res) => {
  try {
    if (!propertyId) {
      return res.status(500).json({
        success: false,
        message: 'Google Analytics not configured'
      });
    }

    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'deviceCategory' }],
      metrics: [{ name: 'activeUsers' }]
    });

    const totalUsers = response.rows?.reduce((sum, row) => {
      return sum + parseInt(row.metricValues?.[0]?.value || '0');
    }, 0) || 1;

    const deviceStats = response.rows?.map(row => {
      const count = parseInt(row.metricValues?.[0]?.value || '0');
      const device = row.dimensionValues?.[0]?.value || 'Unknown';
      return {
        device: device.charAt(0).toUpperCase() + device.slice(1),
        count,
        percentage: Math.round((count / totalUsers) * 100)
      };
    }) || [];

    res.status(200).json({
      success: true,
      data: deviceStats
    });

  } catch (error) {
    console.error('❌ Error fetching device stats from GA:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch device statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Get top countries
 */
exports.getCountryStats = async (req, res) => {
  try {
    if (!propertyId) {
      return res.status(500).json({
        success: false,
        message: 'Google Analytics not configured'
      });
    }

    const limit = parseInt(req.query.limit) || 5;

    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'country' }],
      metrics: [{ name: 'activeUsers' }],
      orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
      limit
    });

    // Country flag mapping
    const countryFlags = {
      'United States': '🇺🇸',
      'United Kingdom': '🇬🇧',
      'Canada': '🇨🇦',
      'Australia': '🇦🇺',
      'Germany': '🇩🇪',
      'France': '🇫🇷',
      'India': '🇮🇳',
      'Japan': '🇯🇵',
      'Brazil': '🇧🇷',
      'Mexico': '🇲🇽'
    };

    const countries = response.rows?.map(row => {
      const name = row.dimensionValues?.[0]?.value || 'Unknown';
      return {
        name,
        users: parseInt(row.metricValues?.[0]?.value || '0'),
        flag: countryFlags[name] || '🌍'
      };
    }) || [];

    res.status(200).json({
      success: true,
      data: countries
    });

  } catch (error) {
    console.error('❌ Error fetching country stats from GA:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch country statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
