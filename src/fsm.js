class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (config==null){
    		throw new TypeError("Error");
        }
        this.initial=config.initial;
        this.state=config.initial;
        this.states=config.states;
        this.listStates=[this.state];
        this.redon=[];
        this.events=[];
        this.Statess=[];
        this.events=[];
    }

    getState() {
        return this.state;
    }

    changeState(state) {
        if (this.states.hasOwnProperty(state)){
            this.state=state;
            this.listStates.push(this.state);
            this.redon=[];
    	}
    	else {
    		throw new TypeError("Error");
    	}
    }

    trigger(event) {
        this.Statess=Object.keys(this.states[this.state].transitions);
        if (this.Statess.includes(event)){
            this.state=this.states[this.state].transitions[event];
            this.listStates.push(this.state);
            this.redon=[];
        }
        else {
            throw new TypeError("Error");
        }
    }

    reset() {
        this.state=this.initial;
        this.listStates=[this.state];
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        this.events=[];
        if (event==null){
        return this.Statess=Object.keys(this.states);   
        }    
        else {
        this.Statess=Object.keys(this.states);
        for (let i=0; i<this.Statess.length; i++){
            if ((Object.keys(this.states[this.Statess[i]].transitions)).includes(event)){
                this.events.push(this.Statess[i]);
            }
        }        
        return this.events; 
        }               
    }

    undo() {
    	if (this.listStates.length>1){
        this.redon.push(this.listStates.pop());
        this.state=this.listStates[this.listStates.length-1];
        return true;
        }
        else {
            return false;
        }

    }

    redo() {
        if (this.redon.length==0){
            return false;
        }
        else {
            this.state=this.redon[this.redon.length-1];
            this.listStates.push(this.state);
            this.redon.pop();
            return true;
        }
    }

    clearHistory() {
        this.listStates=[this.initial];
        this.redon=[];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
