"use strict";

import { config } from "../../script/config.js";
import { numToPx } from "../../util/convert.js";
import {
    prefix,
    isDockExist,
    getFolumn,
    setDockObserver,
    getElementLeft,
} from "../../util/layout.js";

const dockWidth = 40;
var layoutStatus = {
    "marginLeft ": 0,
    "marginRight": 0,
    "dockLeft": true,
    "dockright": true,
    "dividerLeft": 0,
    "dividerRight": 0,
};



function getBtnsWidth(direction) {
    const topBar = document.getElementById("toolbar");
    const vip = document.getElementById("toolbarVIP");
    const btnWidth = 38;
    const macBtnsWidth = 69;
    const winBtnsWidth = 46 * 3;
    let btnNum = 0;

    for (let i = 0; i < topBar.children.length; i++) {
        const btn = topBar.children.item(i);
        if (btn.classList.contains("toolbar__item")) {
            btnNum++;
        }
        if (btn.id === "drag") {
            if (direction === "left") {
                break;
            } else {
                btnNum = 0;
            }
        }
    }

    let margin = 0;

    if (direction === "left") {
        if (vip.children.length === 2) {
            btnNum++;
        }
        margin = btnNum * btnWidth;
        if ("darwin" === window.siyuan.config.system.os) {
            margin += macBtnsWidth;
        }
        return margin;
    } else {
        margin = btnNum * btnWidth - dockWidth;
        if (document.getElementById("windowControls")) {
            margin += winBtnsWidth;
        }
        return margin;
    }
}


function layoutInit() {
    layoutStatus['marginLeft'] = getBtnsWidth('left');
    layoutStatus['marginRight'] = getBtnsWidth('right');
    layoutStatus['dockLeft'] = isDockExist('left');
    layoutStatus['dockRight'] = isDockExist('right');
    if (getFolumn('left')) {
        var dividerLeft = document.querySelectorAll(".layout__resize--lr.layout__resize")[1];
        layoutStatus['dividerLeft'] = getElementLeft(dividerLeft) + dividerLeft.offsetWidth / 2;
    } else {
        layoutStatus['dividerLeft'] = 0;
    }
    if (getFolumn('right')) {
        layoutStatus['dividerRight'] = window.outerWidth -
            getElementLeft(dividerLeft) - dividerLeft.offsetWidth / 2;
    } else {
        layoutStatus['dividerright'] = 0;
    }
}







export function tabBarMain() {
    if (config.plugin.tabBar) {
        layoutInit();
        autoSetTabBarMargin("left");
        autoSetTabBarMargin("right");
    }
}
