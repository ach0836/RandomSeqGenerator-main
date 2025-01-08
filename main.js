'use strict';

let myModal = new bootstrap.Modal(document.getElementById('modal'), {});
myModal.toggle();
let seqArray = [];
let isOverlabed = false;

async function start() {
	try {
		// 기존 랜덤 시퀀스 로직
		let num = option.txt.value;
		let chk1 = option.chk1.checked;
		let chk2 = option.chk2.checked;
		if (num * 0 === 0 && num != "") {
			if (3 <= num && num <= 10000 && num == Math.floor(num)) {
				myModal.toggle();
				for (let i = 0; i < num; i++) seqArray.push(i + 1);
				for (let i = 0; i < num; i++) {
					let rand = Math.floor(Math.random() * num);
					let tmp = seqArray[i];
					seqArray[i] = seqArray[rand];
					seqArray[rand] = tmp;
				}
				if (chk1) isOverlabed = true;
				if (chk2) {
					let outter = document.getElementById('outter');
					let inner = document.getElementById('field');
					outter.className = 'd-flex flex-column justify-content-center vh-100';
					inner.className = 'my-wmax my-hmax';
				}
				launch();
			} else {
				document.getElementById('lb1').style.display = 'none';
				document.getElementById('lb2').style.display = 'block';
			}
		} else {
			document.getElementById('lb1').style.display = 'block';
			document.getElementById('lb2').style.display = 'none';
		}
	} catch (error) {
		console.error('An error occurred:', error);
	}
}

/* make canvas */

const field = document.querySelector('#field');
const myCanvas = document.getElementById('myCanvas');
const ctx = myCanvas.getContext('2d');
ctx.canvas.width = field.offsetWidth;
ctx.canvas.height = field.offsetHeight;

class cannonBall {
	constructor() {
		this.x = 0;
		this.y = 0;
		this.scale = 20;
	}
	draw() {
		let nx = this.x + (myCanvas.width / 2);
		let ny = this.y + (myCanvas.height / 5) + (600 / this.scale);
		let radius = myCanvas.height / this.scale;
		let gx = nx - radius;
		let gy = ny - radius;
		let gradient = ctx.createRadialGradient(gx, gy, radius / 2, nx, ny, radius * 2);
		gradient.addColorStop(0, '#03ff00');
		gradient.addColorStop(1, '#127909');
		ctx.strokeStyle = 'rgba(0, 0, 0, 0)';
		ctx.fillStyle = gradient;
		ctx.beginPath();
		ctx.arc(nx, ny, radius, 0, Math.PI * 2);
		ctx.fill();
		ctx.stroke();
	}
}

class ballNum {
	constructor() {
		this.x = 0;
		this.y = 0;
		this.scale = 20;
		this.num = 'none';
	}
	draw() {
		let sz = String(myCanvas.height / this.scale / 1.5);
		ctx.font = sz + "px Do Hyeon";
		let nx = this.x + (myCanvas.width / 2) - (ctx.measureText(String(this.num)).width / 2);
		let ny = this.y + (myCanvas.height / 5) + (700 / this.scale);
		ctx.fillStyle = 'yellow';
		ctx.fillText(this.num, nx, ny);
	}
}

let ball = new cannonBall();
let number = new ballNum();

/* Animation Control letiables */
let isLooping = false;
let lastTimestamp = null;

/* launch */

let cnt = 0;
let numLog = document.getElementById('log');

// 특정 숫자를 발사하는 함수
function launchNumber(specificNum) {
	if (isOverlabed) {
		ball.scale = 20;
		number.scale = 20;
		number.num = specificNum;
	} else {
		if (cnt < seqArray.length) {
			ball.scale = 20;
			number.scale = 20;
			number.num = specificNum;
			cnt++; // 시퀀스 모드에서는 카운트를 증가시킵니다.
		} else {
			numLog.innerHTML += '<div class="log-inner font-dh">모든 공을 발사하였습니다.</div>';
			numLog.scrollTop = numLog.scrollHeight;
			return; // 더 이상 발사할 수 없습니다.
		}
	}

	if (isOverlabed) {
		numLog.innerHTML += `<div class="log-inner d-flex justify-content-between font-dh"><p>[Overlap] : </p><p>${number.num}번</p></div>`;
	} else {
		numLog.innerHTML += `<div class="log-inner d-flex justify-content-between font-dh"><p>[${cnt}] : </p><p>${number.num}번</p></div>`;
	}
	numLog.scrollTop = numLog.scrollHeight;

	if (!isLooping) {
		isLooping = true;
		lastTimestamp = null;
		requestAnimationFrame(loop);
	}
}

// 기존 launch 함수는 시퀀스에 따라 발사합니다.
function launch() {
	if (isOverlabed) {
		let randNum;
		do {
			randNum = seqArray[Math.floor(Math.random() * seqArray.length)];
		} while (randNum === 11 || randNum === 13); // 11번과 13번을 배제
		launchNumber(randNum);
	} else {
		if (cnt < seqArray.length) {
			let seqNum;
			do {
				seqNum = seqArray[cnt];
				cnt++;
			} while (seqNum === 11 || seqNum === 13 && cnt < seqArray.length); // 11번과 13번을 배제
			if (seqNum !== 11 && seqNum !== 13) launchNumber(seqNum);
		} else {
			numLog.innerHTML += '<div class="log-inner font-dh">모든 공을 발사하였습니다.</div>';
			numLog.scrollTop = numLog.scrollHeight;
		}
	}
}

/* Key to Number Mapping */

// 1-9: 키 '1' ~ '9'
// 10-21: 키 'A' ~ 'L'
const keyToNumberMap = {
	'1': 1,
	'2': 2,
	'3': 3,
	'4': 4,
	'5': 5,
	'6': 6,
	'7': 7,
	'8': 8,
	'9': 9,
	'q': 10,
	'w': 11,
	'e': 12,
	'r': 13,
	't': 14,
	'y': 15,
	'u': 16,
	'i': 17,
	'o': 18,
	'p': 19,
	'[': 20,
	']': 21
};

// 키보드 이벤트 리스너 추가
document.addEventListener('keydown', function (event) {
	let key = event.key.toLowerCase(); // 대소문자 구분 없이 처리
	if (keyToNumberMap.hasOwnProperty(key)) {
		let numberToLaunch = keyToNumberMap[key];
		if (numberToLaunch !== 11 && numberToLaunch !== 13) { // 11번과 13번 배제
			launchNumber(numberToLaunch);
		}
	}
});

/* Animation Loop */

function loop(timestamp) {
	if (!lastTimestamp) lastTimestamp = timestamp;
	const delta = timestamp - lastTimestamp;
	lastTimestamp = timestamp;

	ctx.canvas.width = field.offsetWidth;
	ctx.canvas.height = field.offsetHeight;
	ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

	ball.draw();
	number.draw();

	const scaleDecrementPerSecond = 25; // 스케일 감소 속도 (scale 단위/초)
	const scaleDecrement = scaleDecrementPerSecond * (delta / 1000); // 프레임 간 시간 차이에 따른 감소량

	if (ball.scale > 5) {
		ball.scale -= scaleDecrement;
		number.scale -= scaleDecrement;
	} else {
		// 애니메이션 종료
		isLooping = false;
		return;
	}

	requestAnimationFrame(loop);
}

/* etc */

function reload() {
	window.location.reload();
}
