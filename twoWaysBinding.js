const scope = {};
const ngModel = document.querySelectorAll('[ng-model]');
for(let i=0; i<ngModel.length; i++){
	ngModel[i].addEventListener('input', changeInput);
	setObjectProps(ngModel[i].getAttribute('ng-model'));
}

function changeInput(e){
	const property = e.target.getAttribute('ng-model');
	scope[property] = e.target.value;
}

function setObjectProps(property){
	const ngValue = document.querySelectorAll(`[ng-value=${property}]`);
	const ngModel = document.querySelectorAll(`[ng-model=${property}]`);
	if(!scope.hasOwnProperty(property)){
		Object.defineProperty(scope, property,{
			set: (newValue)=>{
				this.value = newValue;
				for(let i = 0; i<ngModel.length; i++){
					ngModel[i].value = this.value;
				}
				for(let i = 0; i<ngValue.length; i++){
					ngValue[i].innerHTML = this.value;
				}
			},
			get: ()=>{
				return this.value;
			},
			enumerable: true,
		})
	}
}