const pb = document.querySelector(".pb")
const main = document.querySelector(".main")
const circle = pb.querySelector(".circle")

function clampY(y) {
	const threshold = 150
	const top = pb.getBoundingClientRect().top
	if (y < threshold) {
		return (y- threshold)/(screen.height) * threshold + threshold
	}
	return y
}

function update(ix, iy, clamp=true) {
	let rect = pb.getBoundingClientRect();
	let x = ix - rect.left;
	let y = iy - rect.top;

	if (clamp) y = clampY(y)

	circle.style.setProperty("--x", `${x}px`)
	circle.style.setProperty("--y", `${y - 10}px`)
}

function blobStart(ix, iy, clamp=true) {
	update(ix, iy, clamp)
	circle.classList.add("dragged")
	circle.classList.add("moved") /*that's actually empty just bg i guess*/
}

function blobMove(ix, iy) {
	update(ix, iy)
}

function blobStop() {
	// bit risky. can overflow from top of the pb with high values
	circle.classList.add("justrel")
	setTimeout(()=>{
		circle.classList.remove("justrel")
	}, 500)

	circle.classList.remove("moved")
	circle.classList.remove("dragged")
}

// mouse
main.addEventListener("mousedown", e => blobStart(e.clientX, e.clientY))
main.addEventListener("mousemove", e => {
	// down; move out; back while pressing down
	// will run this code. but since ".dragged" is removed, won't reposition
	if (e.which) {
		blobMove(e.clientX, e.clientY)
	}
})
main.addEventListener("mouseup", blobStop)
main.addEventListener("mouseleave", blobStop)

for (let a of main.querySelectorAll("a")) {
	let fun = e => {
		let rect = e.target.getBoundingClientRect()
		let y = rect.top + rect.height / 2
		let x = rect.left + 16 + 4
		blobStart(x, y, false)
	}
	a.addEventListener("mouseenter", fun)
	a.addEventListener("click", fun)
}


// let prevs = false
// touch
main.addEventListener("touchstart", e => {
	const touch = e.changedTouches[0]
	// prevs = touch.clientY > screen.height - 200
	// if (!prevs) return
	blobStart(touch.clientX, touch.clientY)
})
main.addEventListener("touchmove", e => {
	// if (!prevs) return
	// e.preventDefault()
	const touch = e.changedTouches[0]
	blobMove(touch.clientX, touch.clientY)
})
main.addEventListener("touchend", blobStop)

main.querySelector(".right").addEventListener('mouseleave', e => {
	if (e.which) return null // don't stop when pressed and leaved
	blobStop(e.clientX, e.clientY)
})

let header = main.querySelector('.header')
main.querySelector(".me").addEventListener('mouseenter', e => {
	let rect = header.getBoundingClientRect()
	let x = rect.left + rect.width / 2
	let y = rect.top + rect.height + 30
	blobStart(x, y, false)
})
main.querySelector(".me").addEventListener('mouseleave', e => {
	if (e.which) return null // don't stop when pressed and leaved
	blobStop()
})