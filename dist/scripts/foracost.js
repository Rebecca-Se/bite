let casterName = null;
// @ts-ignore
const tokens = canvas.tokens.selected;
let caster = tokens.map((o) => o.actor)[0];
if (!caster && !!casterName) {
    // @ts-ignore
    caster = game.actors.entities.filter((o) => o.name.includes(casterName))[0];
}
let selectedactors = [];
selectedactors.push(tokens.forEach((p) => p.actor));
// @ts-ignore
let phantom = selectedactors.filter(l => getProperty(l, "data.name") != "Christine")[0];
// @ts-ignore
let player = selectedactors.filter(o => o.testUserPermission(game.user, "OWNER"))[0];
function healthCost(name) {
    let value = (Math.ceil(caster.data.data.classes.total.level / 4));
    let cha = caster.data.data.attribute.cha.mod;
    // @ts-ignore
    let r = new Roll(`${value}d4 + ${cha}`);
    r.roll();
    r.toMessage({
        flavor: `Feat heal with ${name} automated`,
        speaker: { alias: caster.actor.data.name },
    });
    return parseInt(r.result);
}
let cost = healthCost("cost");
if (phantom !== null) {
    // @ts-ignore
    let pmchp = getProperty(phantom, "data.attribute.hp.current");
    // @ts-ignore
    let pmthp = getProperty(phantom, "data.attribute.hp.temp");
    // @ts-ignore
    let pmmhp = getProperty(phantom, "data.attribute.hp.max");
    if (pmmhp - pmthp == pmchp && pmthp >= cost) {
        phantom.update("data.attribute.hp.temp", `${pmthp - cost}`);
        phantom.update("data.attribute.hp.max", `${pmmhp - cost}`);
    }
    else if (cost > pmthp) {
        let extra = parseInt(`${cost - pmthp}`);
        phantom.update("data.attribute.hp.max", `${pmmhp - cost + extra}`);
        phantom.update("data.attribute.hp.temp", `0`);
        phantom.update("data.attribute.hp.current", `${pmchp - extra}`);
    }
}
else {
    // @ts-ignore
    let pchp = getProperty(player, "data.attribute.hp.current");
    // @ts-ignore
    let pthp = getProperty(player, "data.attribute.hp.temp");
    // @ts-ignore
    let pmhp = getProperty(player, "data.attribute.hp.max");
    if (pmhp - pthp == pchp && pthp >= cost) {
        player.update("data.attribute.hp.temp", `${pthp - cost}`);
        player.update("data.attribute.hp.max", `${pmhp - cost}`);
    }
    else if (cost > pthp) {
        let extra = parseInt(`${cost - pthp}`);
        player.update("data.attribute.hp.max", `${pmhp - cost + extra}`);
        player.update("data.attribute.hp.temp", `0`);
        player.update("data.attribute.hp.current", `${pchp - extra}`);
    }
}
