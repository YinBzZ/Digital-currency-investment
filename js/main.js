"use strict";
(function() {
	// const m1 = document.getElementById("price").value, //价格
	// 	m2 = document.getElementById("Amount").value, //买多少
	// 	s1 = document.getElementById("percentage").value, //网格百分比
	// 	s2 = document.getElementById("Overweight").value, //加码百分比
	// 	s3 = document.getElementById("SellMoney").value; //卖出价格

	const r1 = document.getElementById("Amount_required"), //所需金额
		r2 = document.getElementById("Profit_amount"), //盈利金额
		r3 = document.getElementById("Profit_ratio"); //盈利比例

	const inputs = document.querySelectorAll(".Myinput"),
		tds = document.querySelectorAll(".small-grid td"),
		b = new Array,
		newTds = new Array;

	const NumDl = x => Math.floor(x * 100) / 100;

	let allMoney = 0,
		profit = 0,
		ratio = 0,
		nkF = false;

	const Data_deal = {
		get: () => {
			const ve = new Array;
			for (let i = 0; i < inputs.length; i++) {
				ve.push(Number(inputs[i].value));
			}
			return ve;
		},
		clac: function() {
			console.log(this.get());
			let _a = this.get()[0],
				_b = this.get()[1],
				_c = this.get()[2] / 100,
				_d = this.get()[3] / 100,
				e = this.get()[4],
				_f = this.get()[5],
				_a1 = _a,
				_b1 = _b,
				_g = 0,
				_e = 0;
			b.length = 0;
			for (let i = 0; i < _f; i++) {
				_e = _b * (1 - _a / e);
				allMoney += _b;
				profit += _e;
				ratio = _e / _b * 100;
				_a = _a1 - _a1 * _c * i;
				nkF ? _b = _b1 + _b1 * _d * i : null;
				_g = Number(String(_b / _a).replace(/^(.*\..{6}).*$/, "$1"));
				// console.log(_c, i, _c * (i + 1),_a * NumDl(_c * (i + 1)));
				b.push([i + 1, NumDl(_a), NumDl(_b), _g, NumDl(_e)]);
			}
			// console.dir(b);
			this.display();
		},
		registration: function() {
			for (let i = 0; i < inputs.length; i++) {
				inputs[i].addEventListener("blur", () => {
					allMoney = profit = ratio = 0;
					this.ReTds();
				});
			}
		},
		display: function() {
			const _f = this.get()[5];
			for (let i = 0; i < 100; i++) {
				tds[i].innerHTML = null;
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
		ReTds: function() {
			let _f = Data_deal.get()[5],
				x = 0;
			newTds.length = 0;
			console.log(_f);
			for (let i = 0; i < _f; i++) {
				newTds.push([]);
			}
			for (let i = 0; i < _f * 5; i++) {
				if (i >= 5 && i % 5 == 0) {
					x++;
				}
				newTds[x].push(tds[i]);
			}
			this.clac();
		}
	}

	function rem() {
		const Owidth = document.documentElement.clientWidth || document.body.clientWidth;
		document.documentElement.style.fontSize = `${Owidth / 320 * 8}px`;
	};

	const nk = document.getElementById("nav-checkbox");

	nk.addEventListener("click", function() {
		this.checked ? nkF = true : nkF = false;
		Data_deal.ReTds();
	});

	document.getElementById("header_butt").addEventListener("click", () => {
		const ul = document.querySelector("#header ul");
		console.log(ul.style.display);
		if (ul.style.display == "none") {
			ul.style.display = "block";
		} else {
			ul.style.animation = "listOut 1s";
			setTimeout(() => {
				ul.style.display = "none";
				ul.style.animation = "";
			}, 1000);
		}
	});

	window.onload = () => {
		rem();
	}

	window.onresize = () => {
		rem();
	}

	Data_deal.registration();

})();
