/*
 * @Author: 宋乾
 * @Date: 2019-05-19 19:03:54
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-05-19 19:14:36
 */

// 组件被销毁后阻止数据改变
function Mounted(target: Function) {
    const _target = target.prototype;
    
	const {
		componentDidMount,
        componentWillUnmount,
		setState,
    } = _target;

    let _isMounted = false;
    
	_target.componentDidMount = function (){
		_isMounted = true;
        componentDidMount && componentDidMount.call(this);
    }
    
	_target.componentWillUnmount = function (){
        _isMounted = false;
		componentWillUnmount && componentWillUnmount.call(this);
	}

	_target.setState = function (){
		if (_isMounted) {
			setState.apply(this, arguments);
		}
    }
}

// 只读
function readonly(...args: any) {
    let descriptor = args[2];
    descriptor.writable = false;
    return descriptor;
}

export { Mounted };
export { readonly };