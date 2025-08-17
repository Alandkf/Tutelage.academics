exports.get = (req, res) => {
   return res.status(200).json({
      success: true,
      message: 'Videos fetched successfully',
      data: [
         {
            id: 1,
            title: 'Introduction to Mathematics',
            description: 'Learn the basics of mathematics',
            url: 'https://www.youtube.com/embed/Kp2bYWRQylk',
            thumbnail: 'https://img.youtube.com/vi/Kp2bYWRQylk/hqdefault.jpg',
            category: 'Mathematics'
         },
         {
            id: 2,
            title: 'Advanced Physics Concepts',
            description: 'Explore advanced physics theories',
            url: 'https://www.youtube.com/embed/0NbBjNiw4tk',
            thumbnail: 'https://img.youtube.com/vi/0NbBjNiw4tk/hqdefault.jpg',
            category: 'Physics'
         },
         {
            id: 3,
            title: 'Chemistry Fundamentals',
            description: 'Understanding basic chemistry principles',
            url: 'https://www.youtube.com/embed/FSyAehMdpyI',
            thumbnail: 'https://img.youtube.com/vi/FSyAehMdpyI/hqdefault.jpg',
            category: 'Chemistry'
         }
      ]
    }); 
}
