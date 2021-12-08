/**
 * 定义：
 * bind() 方法会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数。(来自于 MDN )
 * 
 * 注意点：
 * 参数合并
 * new调用bind返回的函数时this指向
 * bind调用后返回的函数的原型处理
 * 
 */

Function.prototype.myBind = function (context) {
  if(typeof this !== 'function') throw new Error(`${this} in not a function`)

  const self = this
  const args = Array.prototype.slice.call(arguments, 1)

  const retFun = function () {

    // 参数合并
    const bindArgs = Array.prototype.slice.call(arguments)

    // 不考虑new 
    // return self.apply(context, args.concat(bindArgs))

    // 考虑new
    return self.apply(this instanceof retFun ? this : context, args.concat(bindArgs))
  }

  // bind调用后返回的函数的原型处理
  retFun.prototype = Object.create(this.prototype)

  return retFun
}

const context = {
  sex: '男'
}

const testFun = function (name, age) {
  console.log(name, age, this.sex, this)
}

const fun = testFun.myBind(context, 'wml', '18')

fun()
new fun()




