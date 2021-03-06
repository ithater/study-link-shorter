const { Router } = require('express');
const Link = require('../models/Link');
const router = Router();

// /t/:code
router.get('/:code', async (request, response) => {
	try {
		const link = await Link.findOne({ code: request.params.code });
		if (link) {
			link.clicks++;
			await link.save();
			return response.redirect(link.from);
		}
		response.status(404).json('Cсылка не найдена');
	} catch (e) {
		console.log(e);
		response
			.status(500)
			.json({ message: 'Что-то пошло не так, попробуйте снова.' });
	}
});

module.exports = router;
