exports.goMain = async function (req, res, next) {
    try {
        console.log('gdgdgdg');
        res.render('index');
    } catch (error) {
        next(error);
    }
};
