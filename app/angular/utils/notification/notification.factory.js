'use strict';

const notificationModule = require('./notification.module');
const moment             = require('moment');

notificationModule.factory('notification', notification);

/** @ngInject */
function notification(Restangular, $q, exception, $localStorage, $sce, $location) {
	const service = {
		getNotification,
		click,
	};

	return service;

	async function getNotification() {
		const defer = $q.defer();

		try {
			let notifyList = await Restangular.one('user', $localStorage.user.uid).one('notification').getList();
			notifyList.forEach((n)=> {
				n = parseNotify(n);
			});
			defer.resolve(notifyList);
		} catch (err) {
			defer.reject(err);
		}
		
		return defer.promise;
	}

	async function click(n) {
		let defer = $q.defer();

		try {
			await Restangular.one('/notification/', n.nid).one('read').put();
			$location.path(n.url);
			n.read = true;
			defer.resolve(n);
		} catch (err) {
			defer.reject(err);
		}
	
		return defer.promise;
	}

	function parseNotify(n) {
		try {
			n.icon = '../../../images/notify/';
			switch (n.body.codeType) {
				case 10001:
					n.icon += 'people.svg';
					n.url = `/seek/${n.body.payload.goods.gid}`;
					n.text = `你關注的<b>${n.body.payload.goods.owner.name}</b>發佈<b>${n.body.payload.goods.name}</b>，趕快去看看吧！`;
					break;
				case 10002:
					//n.text = `<b>${n.body.payload.person.name}</b>關注了<b>${n.body.payload.goods.name}</b>，趕快去看看吧！`;
					n.icon += 'people.svg';
					break;
				case 10003:
					//n.text = `<b>${n.body.payload.person.name}</b>追隨了<b>${n.body.payload.goods.name}</b>，趕快去看看吧！`;
					n.icon += 'people.svg';
					break;
				case 10004:
					n.icon += 'star.svg';
					n.url = `/profile/${n.body.payload.person.uid}`;
					n.text = `<b>${n.body.payload.person.name}</b>追隨了你。`;
					break;
				case 20001:
					n.icon += 'comment.svg';
					n.url = `/seek/${n.body.payload.goods.gid}`;
					n.text = `你的<b>${n.body.payload.goods.name}</b>有新留言喔`;
					break;
				case 20002:
					n.icon += 'exwd.svg';
					n.url = `/seek/${n.body.payload.queue.host_goods.gid}/queuing`;
					n.text = `有新的物品排了你的<b>${n.body.payload.queue.host_goods.name}</b>`;
					break;
				case 20003:
					n.icon += 'heart.svg';
					n.url = `/profile/${n.body.payload.person.uid}`;
					n.text = `<b>${n.body.payload.person.name}</b>關注了你的物品`;
					break;
				case 20004:
					n.icon += 'comment.svg';
					n.url = `/seek/${n.body.payload.goods.gid}`;
					n.text = `你關注的<b>${n.body.payload.goods.name}</b>有新的留言`;
					break;
				case 30001:
					n.icon += 'exwd.svg';
					n.url = `/me/history`;
					n.text = `有人接受了你的排，快去看看吧！</b>`;
					break;
				case 30002:
					break;
				case 30003:
					break;
				default:
					break;
			}
			n.textHtml = $sce.trustAsHtml(n.text);
			n.created_at = moment(n.created_at.slice(0, -1)).add(8, 'h').fromNow();
		} catch (err) {
			console.error(err);
		}
		return n;
	}
}
