import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { db, getCachedRepository } from '$lib/server/db';
import { cachedRepository } from '$lib/server/db/schema';
import isEqual from 'lodash/isEqual';

export const GET: RequestHandler = async () => {
	const result = await getCachedRepository();
	const success = result.length > 0;
	return json({ success, results: result });
};

export const POST: RequestHandler = async ({ request }) => {
	console.log('post');
	let rawJson: any = await request.json();
	const submitterId = rawJson.submitterId;
	const currentJson: any[] = await getCachedRepository();
	console.log(currentJson[0].id);
	const currentJsonExists = currentJson.length > 0;
	delete rawJson.data['Muse.Goi2.Entity.BadWord']; // Don't want this ;D
	const expectedKeys = [
		'Muse.Goi2.Entity.FloatConstant',
		'Muse.Goi2.Entity.SystemConfiguration',
		'Muse.Goi2.Entity.Text',
		'Muse.Goi2.Entity.SkillConfig',
		'Muse.Goi2.Entity.Region',
		'Muse.Goi2.Entity.MapGroup',
		'Muse.Goi2.Entity.Item',
		'Muse.Goi2.Entity.ShipModel',
		'Muse.Goi2.Entity.Quest',
		'Muse.Goi2.Entity.AvatarClassSetting',
		'Muse.Goi2.Entity.Reward',
		'Muse.Goi2.Entity.SkillEffectDescriptor',
		'Muse.Goi2.Entity.FactionBase',
		'Muse.Goi2.Entity.WorldLocation',
		'Muse.Goi2.Entity.DifficultyLevel',
		'Muse.Goi2.Entity.ClanLevel',
		'Muse.Goi2.Entity.WorldItem',
	];
	if (!expectedKeys.every((value) => Object.keys(rawJson.data).includes(value))) {
		console.log('Error. Missing expected keys.');
		return json({ success: false, message: 'Error. Missing expected keys.' });
	}
	// console.log(
	// 	currentJsonExists,
	// 	isEqual(
	// 		rawJson.data['Muse.Goi2.Entity.ShipModel'],
	// 		currentJson[0].json['Muse.Goi2.Entity.ShipModel'],
	// 	),
	// );
	// console.log(differenceWith(rawJson.data["Muse.Goi2.Entity.ShipModel"], currentJson[0].json["Muse.Goi2.Entity.ShipModel"], isEqual));
	// console.log(
	// 	JSON.stringify(rawJson.data['Muse.Goi2.Entity.ShipModel'].find((item) => item.Id === 70)),
	// );
	// console.log(
	// 	'\n',
	// 	JSON.stringify(
	// 		currentJson[0].json['Muse.Goi2.Entity.ShipModel'].find((item) => item.Id === 70),
	// 	),
	// );
	if (
		currentJsonExists &&
		/*JSON.stringify(rawJson.data) === JSON.stringify(currentJson[0].json)*/ isEqual(
			rawJson.data,
			currentJson[0].json,
		)
	) {
		console.log('Current. Database not updated.');
		return json({ success: false, message: 'Current. Database not updated.' });
	}
	await db.insert(cachedRepository).values({ json: rawJson.data, submitterId });
	// await db.execute(sql`optimize table 'cached_repository'`);
	console.log('Outdated. Database updated.');
	return json({ success: true, message: 'Outdated. Database updated.' });
};
