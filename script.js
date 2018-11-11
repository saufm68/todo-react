import 'moment.js'

class Item extends React.Component {
    constructor() {
        super();
        this.deleteItem = this.deleteItem.bind(this);
        this.done = this.done.bind(this);
    }

    deleteItem(event) {
        event.preventDefault();
        var target = event.target.parentNode.parentNode;
        if (event.target.classList[0] == 'done') {
            this.props.deleteDone(target.textContent.split('-Delete-')[0]);
        } else {
            this.props.delete(target.textContent.split('-Delete-')[0]);
        }
    }

    done(event) {
        event.preventDefault();
        var target = event.target.parentNode.parentNode;
        this.props.move(target.textContent.split('-Delete-')[0]);
    }

    render() {
        var done;
        if (this.props.type === 'list') {
            done = <a href="#" onClick={this.done}>-Done-</a>
        }
        return(
            <li>{this.props.item}<div className="options"><a className={this.props.type} href="#" onClick={this.deleteItem}>-Delete-</a>{done}</div></li>
        );
    };
};

class List extends React.Component {
  constructor(){
    super();
    this.addItem = this.addItem.bind( this );
    this.checkValidation = this.checkValidation.bind( this );
    this.deleteItem = this.deleteItem.bind(this);
    this.deleteDoneItem = this.deleteDoneItem.bind(this);
    this.moveToDone = this.moveToDone.bind(this);
  }

  state = {
    list : [],
    done : [],
    word : ""
  }

  checkValidation(event) {
    if (event.target.value.length < 5) {
        event.target.style.backgroundColor = "rgba(255,0,0,0.3)";
        event.target.nextSibling.disabled = true;
        event.target.parentNode.lastChild.style.display = "initial";
    } else {
        event.target.style.backgroundColor = "initial";
        event.target.nextSibling.disabled = false;
        event.target.parentNode.lastChild.style.display = "none";
    }
  };

  addItem(event) {
    var input = event.target.previousSibling.value;
    event.target.previousSibling.value = "";
    this.state.list.push(input);
    this.setState({word:input});
  };

  deleteItem(list) {
    var newList = this.state.list;
    newList.splice(newList.indexOf(list), 1);
    this.setState({list:newList});
  };

  deleteDoneItem(done) {
    var newList = this.state.done;
    newList.splice(newList.indexOf(done), 1);
    this.setState({done:newList});
  };

  moveToDone(list) {
    var newList = this.state.list;
    var newDone = this.state.done;
    newList.splice(newList.indexOf(list), 1);
    newDone.push(list);
    this.setState({list:newList,done:newDone});
  }

  render() {
      var listItem = this.state.list.map((e, index) => {
        return <Item key={index} item={e} delete={this.deleteItem} move={this.moveToDone} type="list" />
      });
      var doneListItem = this.state.done.map((e, index) => {
        return <Item key={index} item={e} deleteDone={this.deleteDoneItem} type="done" />
      });
      return (
        <div className="list">
          <div>
              <div className="container">
                <h2>To-Do</h2>
                <ol>{listItem}</ol>
              </div>
              <div className="container">
                <h2>Done</h2>
                <ol>{doneListItem}</ol>
              </div>
          </div>
          <br/>
          <input onChange={this.checkValidation} defaultValue={this.state.word} />
          <button onClick={this.addItem}>add item</button><br/><br/>
          <div id="error-message">Task needs to be at least 5 characters long</div>
        </div>
      );
    };
};

ReactDOM.render(
    <List/>,
    document.getElementById('root')
);

