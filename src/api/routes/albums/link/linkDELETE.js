const Route = require('../../../structures/Route');

class linkDELETE extends Route {
	constructor() {
		super('/album/link/delete/:identifier', 'delete');
	}

	async run(req, res, db) {
		const { identifier } = req.params;
		if (!identifier) return res.status(400).json({ message: 'Invalid identifier supplied' });

		try {
			const link = await db.table('links')
				.where({ identifier })
				.first();

			if (!link) return res.status(400).json({ message: 'Identifier doesn\'t exist' });

			await db.table('links')
				.where({ id: link.id })
				.delete();
			await db.table('albumsLinks')
				.where({ linkId: link.id })
				.delete();
		} catch (error) {
			console.log(error);
			return super.error(res, error);
		}

		return res.json({
			message: 'Successfully deleted link'
		});
	}
}

module.exports = linkDELETE;