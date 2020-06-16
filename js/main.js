"use strict";
const r1 = document.getElementById("Amount_required"), //所需金额
	r2 = document.getElementById("Profit_amount"), //盈利金额
	r3 = document.getElementById("Profit_ratio"), //盈利比例
	inputs = document.querySelectorAll(".Myinput"),
	tds = document.querySelectorAll(".small-grid td"),
	nk = document.getElementById("nav-checkbox"),
	b = new Array,
	newTds = new Array,
	NumDl = x => Math.floor(x * 100) / 100,
	rem = () => {
		const Owidth = document.documentElement.clientWidth || document.body.clientWidth;
		document.documentElement.style.fontSize = `${Owidth / 320 * 8}px`;
	};

let allMoney, profit, ratio, nkF = false;
const Data_deal = {
	clac() {
		let [_a, _b, _c, _d, e, _f, _a1, _b1, _g, _e] = (() => {
			const o = new Array;
			for (let i = 0; i < inputs.length; i++) {
				o.push(Number(inputs[i].value));
			}
			o.push(o[0], o[1], 0, 0);
			return o;
		})();
		b.length = allMoney = profit = 0;
		for (let i = 0; i < _f; i++) {
			_e = _b * (1 - _a / e);
			allMoney += _b;
			profit += _e;
			ratio = _e / _b * 100;
			_a = _a1 - _a1 * _c / 100 * i;
			nkF ? _b = _b1 + _b1 * _d / 100 * i : null;
			_g = Number(String(_b / _a).replace(/^(.*\..{6}).*$/, "$1"));
			b.push([i + 1, NumDl(_a), NumDl(_b), _g, NumDl(_e)]);
		}
		this.display();
	},
	registration() {
		for (let i = 0; i < inputs.length; i++) {
			inputs[i].addEventListener("blur", () => {
				allMoney = profit = ratio = 0;
				this.ReTds();
			}, false);
		}
		nk.addEventListener("click", target => {
			target.toElement.checked ? nkF = true : nkF = false;
			this.ReTds();
		}, false);
	},
	display() {
		const _f = inputs[5].value;
		for (let i = 0; i < tds.length; i++) {
			tds[i].innerHTML = null
		}
		for (let i = 0; i < _f; i++) {
			for (let _i = 0; _i < 5; _i++) {
				newTds[i][_i].innerHTML = b[i][_i];
			}
		}
		r1.innerHTML = `${NumDl(allMoney)}`;
		r2.innerHTML = `${NumDl(profit)}`;
		r3.innerHTML = `${NumDl(ratio)}%`;
	},
	ReTds() {
		let _f = inputs[5].value,
			x = 0;
		newTds.length = 0;
		for (let i = 0; i < _f; i++) {newTds.push([])}
		for (let i = 0; i < _f * 5; i++) {
			if (i >= 5 && i % 5 == 0) {x++}
			newTds[x].push(tds[i]);
		}
		this.clac();
	}
}

let mediaF = false;
(() => {
	document.getElementById("header_butt").addEventListener("click", () => {
		const ul = document.querySelector("#header ul");
		if (ul.style.display == "none") {
			ul.style.display = "block";
		} else {
			ul.style.animation = "listOut 1s";
			setTimeout(() => {
				ul.style.display = "none";
				ul.style.animation = "";
			}, 1000);
		}
	}, false);

	document.getElementById("media_nav_butt").addEventListener("touchstart", () => {
		const nav = document.getElementById("nav");
		!mediaF ? nav.style.left = "0%" : nav.style.left = "-100%";
		!mediaF ? mediaF = true : mediaF = false;
	}, false);

	document.addEventListener("touchmove", event => {
		event.preventDefault();
	}, {passive: false});
})();

window.onload = () => rem();
window.onresize = () => rem();
Data_deal.registration();
