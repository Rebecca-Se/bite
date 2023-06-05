let casterName = null;

const otokens = canvas.tokens.filter((t) => t.testUserPermission(game.user, "OWNER"));
declare var a;
declare var b:string;

const getp:Function = getProperty(a,b)


let caster = game.user.character;
if (!caster && !!casterName) {
    caster = game.actors.entities.filter((o) => o.name.includes(casterName))[0];
}

let selectedactors = [];
let asheet: {} = (new ActorSheet(caster,caster.data)).getData();

otokens.map.forEach((p) => selectedactors.push(p.actor));



async function send() {
	let prompt = document.createElement('dialog');
	const windowed = window.open(document.URL);
	prompt.showModal();
	windowed.focus();
	await h(c);
	windowed.close();
}

async function h(z:string) {

	let actor:Actor;
	let b = z.includes("phantom");
	if (b) {
		selectedactors.forEach((l:Actor) => {
			if (getp.apply(l.data, `name`) != "Christine") {
				actor = l;
			}
		})
	}
	
	
	let cost = healthCost("heal cost");

	if (b) {
		let pmchp:number = getp.apply(actor.data,"attribute.hp.value");
		let pmthp:number = getp.apply(actor.data,"attribute.hp.temp");
		let pmmhp:number = getp.apply(actor.data,"attribute.hp.max");
		if (pmmhp - pmthp == pmchp && pmthp >= cost) {
			const dat = {
			"attribute.hp.temp": `${pmthp - cost}`,
			"attribute.hp.max": `${pmmhp - cost}`,
			};
			await actor.update(dat);
			return;
		} else if (cost > pmthp) {
			let extra:number = parseInt(`${cost - pmthp}`);
			const j = {
				"attribute.hp.max": `${pmmhp - cost + extra}`,
				"attribute.hp.temp": `0`,
				"attribute.hp.value": `${pmchp - extra}`,
			};
			await actor.update(j);
			return;
		}
	} else {
		let pchp = getp.apply(actor.data,"attribute.hp.value");
		let pthp = getp.apply(actor.data,"attribute.hp.temp");
		let pmhp = getp.apply(actor.data,"attribute.hp.max");
		if (pmhp - pthp == pchp && pthp >= cost) {
			const h = {
			"attribute.hp.temp": `${pthp - cost}`,
			"attribute.hp.max": `${pmhp - cost}`,
			};
			await actor.update(h)
			return;
		} else if (cost > pthp) {
			let extra:number = parseInt(`${cost - pthp}`)
			const i = {
			"attribute.hp.max": `${pmhp - cost + extra}`,
			"attribute.hp.temp": `0`,
			"attribute.hp.value": `${pchp - extra}`,
			};
			await actor.update(i)
			return;
		} else {
			postMessage("I can't heal since I'm too low on health!", actor.name)
			stop();
			return;
		}
	}
};

function healthCost(name:string): number {
	let value = (Math.ceil(getp(asheet, "classes.total.level") / 4));
	let cha = getp(asheet, "attribute.cha.mod");
	let r = new Roll(`${value}d4 + ${cha}`)
	r.roll();
	r.toMessage({
	  flavor: `Feat ${name} automated`,
	  speaker: { alias: getp(asheet,"name") },
	});
	return parseInt(r.result)
};

const who = document.getElementById('who');
const outputBox = document.querySelector('output');
const confirmBtn = who.querySelector('form');
let c:string;

who.addEventListener('show', () => {
	who.focus();
})
// Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
confirmBtn.addEventListener('click', (event) => {
  	event.preventDefault(); // We don't want to submit this fake form
  	outputBox.value = c === 'cancel' ? null : `${event.returnValue}`; // Have to send the select box value here.     
});