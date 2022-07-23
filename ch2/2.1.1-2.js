const a = 0;
//a = 1; // Uncaught TypeError: Assignment to constant variable.
let b = 0;
b = 1; // 1
//const c; // Uncaught SyntaxError: Missing initializer in const declaration

const d = { name: 'taekky'};
d.name = 'taekky2' //이건 실행되는걸 보면 d = 이거만 한번 

const e = function() {
    console.log('hi');
}
e();
e``; //tagged template literal