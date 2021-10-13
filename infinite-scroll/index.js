console.log('yayy')

const cont = document.getElementById('cont')
var count = 0;
//append 20 lines
function initial() {
    for (let i = 1; i <= 25; i++){
        count++;
        let div = document.createElement('div');
        div.setAttribute('class', 'divCont')
        div.innerHTML = `Masai Student ${count}`
        cont.append(div)
    }
}
initial()


//on scroll, append new 20 lines 


cont.addEventListener('scroll', () => {
    console.log(cont.clientHeight+cont.scrollTop,cont.scrollHeight )
    if (cont.scrollTop + cont.clientHeight+2 >= cont.scrollHeight) {
        console.log('true')
        initial()
        //debounce(initial, 300)
    }
   // console.log(cont.scrollY)
})


//   const debounce = function (fn, delay) {
//       let timer;
//       console.log('debounce')
//       return function () {
//          console.log('debounce2')
//          let context = this,
//              args = arguments;
//          clearTimeout(timer);
//          timer = setTimeout(() => {
//             initial.apply(context, arguments) 
//          }, delay);
//      }
//  } 