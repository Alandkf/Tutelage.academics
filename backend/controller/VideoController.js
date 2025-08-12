exports.get = (req, res) => {
   return res.status(200).json({
      success: false,
      message: 'Video route is here',
    }); 
}
