var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let casterName = null;
const js = "main.js";
let macro = Macro.config.baseEntity;
macro.importFromJSON(js);
const macr = game.user.assignHotbarMacro(macro, 1);
const otokens = canvas.tokens.filter((t) => t.testUserPermission(game.user, "OWNER"));
const getp = getProperty(a, b);
let caster = game.user.character;
if (!caster && !!casterName) {
    caster = game.actors.entities.filter((o) => o.name.includes(casterName))[0];
}
let selectedactors = [];
let asheet = (new ActorSheet(caster, caster.data)).getData();
otokens.map.forEach((p) => selectedactors.push(p.actor));
function execute() {
    return __awaiter(this, void 0, void 0, function* () {
        yield send();
        yield h(c);
    });
}
function send() {
    return __awaiter(this, void 0, void 0, function* () {
        let prompt = document.createElement('dialog');
        const windowed = window.open(document.URL);
        prompt.showModal();
        windowed.focus();
    });
}
function h(z) {
    return __awaiter(this, void 0, void 0, function* () {
        let actor;
        let b = z.includes("phantom");
        if (b) {
            selectedactors.forEach((l) => {
                if (getp.apply(l.data, `name`) != "Christine") {
                    actor = l;
                }
            });
        }
        let cost = healthCost("heal cost");
        if (b) {
            let pmchp = getp.apply(actor.data, "attribute.hp.value");
            let pmthp = getp.apply(actor.data, "attribute.hp.temp");
            let pmmhp = getp.apply(actor.data, "attribute.hp.max");
            if (pmmhp - pmthp == pmchp && pmthp >= cost) {
                const dat = {
                    "attribute.hp.temp": `${pmthp - cost}`,
                    "attribute.hp.max": `${pmmhp - cost}`,
                };
                yield actor.update(dat);
                return;
            }
            else if (cost > pmthp) {
                let extra = parseInt(`${cost - pmthp}`);
                const j = {
                    "attribute.hp.max": `${pmmhp - cost + extra}`,
                    "attribute.hp.temp": `0`,
                    "attribute.hp.value": `${pmchp - extra}`,
                };
                yield actor.update(j);
                return;
            }
        }
        else {
            let pchp = getp.apply(actor.data, "attribute.hp.value");
            let pthp = getp.apply(actor.data, "attribute.hp.temp");
            let pmhp = getp.apply(actor.data, "attribute.hp.max");
            if (pmhp - pthp == pchp && pthp >= cost) {
                const h = {
                    "attribute.hp.temp": `${pthp - cost}`,
                    "attribute.hp.max": `${pmhp - cost}`,
                };
                yield actor.update(h);
                return;
            }
            else if (cost > pthp) {
                let extra = parseInt(`${cost - pthp}`);
                const i = {
                    "attribute.hp.max": `${pmhp - cost + extra}`,
                    "attribute.hp.temp": `0`,
                    "attribute.hp.value": `${pchp - extra}`,
                };
                yield actor.update(i);
                return;
            }
            else {
                postMessage("I can't heal since I'm too low on health!", actor.name);
                stop();
                return;
            }
        }
    });
}
;
function healthCost(name) {
    let value = (Math.ceil(getp(asheet, "classes.total.level") / 4));
    let cha = getp(asheet, "attribute.cha.mod");
    let r = new Roll(`${value}d4 + ${cha}`);
    r.roll();
    r.toMessage({
        flavor: `Feat ${name} automated`,
        speaker: { alias: getp(asheet, "name") },
    });
    return parseInt(r.result);
}
;
const who = document.getElementById('who');
const form = who.querySelector('form');
const value = form.querySelector('input');
let c;
// Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
form.addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
    event.preventDefault();
    if (value.value != null)
        value.value = c === 'cancel' ? null : form.nodeValue;
    if (c == null) {
        close();
        Promise.resolve(true);
        return;
    }
    h(c);
    Promise.resolve(true);
    return;
}), { capture: false, once: true });
