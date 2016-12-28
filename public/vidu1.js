class List extends React.Component{
  constructor(props){
    super(props);
    this.state = {mang: ['Android', 'iOS', 'NodeJS', 'Script']}
  }
  render(){
    return (
      <div>
        <NoteForm parent={this}/>
        {this.state.mang.map((e, i) => <Note key={i} index={i}
        parent={this}>{e}</Note>)}
      </div>
    );
  }
}

class Note extends React.Component{
  remove(){
    var {parent} = this.props;
    parent.state.mang.splice(this.props.index, 1);
    parent.setState(parent.state);
  }
  render(){
    return (
      <div>
        <p>{this.props.children}</p>
        <button onClick={this.remove.bind(this)}>Xoa</button>
      </div>
    )
  }
}

class NoteForm extends React.Component{
  add(){
    var {parent} = this.props;
    parent.state.mang.push(this.refs.txt.value);
    parent.setState(parent.state);
    this.refs.txt.value = '';
  }
  render(){
    return (
      <div>
        <input type="text" ref="txt" placeholder="Enter your note"/>
        <br/><br/>
        <button onClick={this.add.bind(this)}>Add</button>
      </div>
    );
  }
}
ReactDOM.render(
  <div>
    <List/>
  </div>,
  document.getElementById('root')
);
