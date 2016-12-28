class List extends React.Component{
  update(index, obj){
    this.state.mang[index] = obj;
    this.setState(this.state);
  }
  remove(index){
    this.state.mang.splice(index, 1);
    this.setState(this.state);
  }
  add(obj){
    this.state.mang.push(obj);
    this.setState(this.state);
  }
  constructor(props){
    super(props);
    this.state = {
      mang: []
    }
  }
  render(){
    return (
      <div>
        <NoteForm handleAdd={this.add.bind(this)}/>
        {this.state.mang.map((e, i) => <Note key={i} index={i}
        handleRemove={this.remove.bind(this)}
        handleSave={this.update.bind(this)} info={e}/>)}
      </div>
    );
  }
  componentDidMount(){
    $.post('/select', (rows) => {
      this.state.mang = rows;
      this.setState(this.state);
    })
  }
}

class Note extends React.Component{
  constructor(props){
    super(props);
    this.state = {isUpdating: false}
  }
  save(){
    var {handleSave, index} = this.props;
    //handleSave(index, this.refs.txt.value);
    var content = this.refs.note.value;
    var sub = this.refs.sub.value;
    var id = this.props.info.id;
    $.post('/update', {id, content, sub}, data => {
      //Xu ly loi neu co
      console.log(data);
      handleSave(index, data);
    });
    this.setState({isUpdating: false});
  }
  cancel(){
    this.setState({isUpdating: false});
  }
  update(){
    this.setState({isUpdating: true});
  }
  remove(){
    var {handleRemove, index} = this.props;
    var {id} = this.props.info;
    $.post('/remove', {id}, data => {
      if(data == 'Thanh cong'){
        handleRemove(index);
      }else{
        alert('Loi: ' + data)
      }
    });
    //handleRemove(index);
  }
  render(){
    var xhtml = this.state.isUpdating?
    <div>
      <h1>{this.props.info.subject}</h1>
      <input type="text" defaultValue={this.props.info.subject} ref="sub"/>
      <br/><br/>
      <input type="text" defaultValue={this.props.info.content} ref="note"/>
      <br/><br/>
      <button onClick={this.save.bind(this)}>Luu</button>
      <button onClick={this.cancel.bind(this)}>Huy</button>
    </div>:
    <div>
      <h1>{this.props.info.subject}</h1>
      <p>{this.props.info.content}</p>
      <button onClick={this.remove.bind(this)}>Xoa</button>
      <button onClick={this.update.bind(this)}>Sua</button>
    </div>
    return (xhtml);
  }
}

class NoteForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {isAdding: false}
  }
  show(){
    this.setState({isAdding: true})
  }
  add(){
    // var {handleAdd} = this.props;
    // handleAdd(this.refs.txt.value);
    // this.refs.txt.value = '';
    var sub = this.refs.sub.value;
    var note = this.refs.note.value;
    $.post('/insert', {sub, note}, data => {
      this.props.handleAdd(data);
    });
    this.setState({isAdding: false})
  }
  render(){
    var xhtml = this.state.isAdding?
    <div>
      <input type="text" ref="sub" placeholder="Enter your subject"/>
      <br/><br/>
      <input type="text" ref="note" placeholder="Enter your note"/>
      <br/><br/>
      <button onClick={this.add.bind(this)}>Add</button>
    </div>:
    <button onClick={this.show.bind(this)}>Show</button>
    return (xhtml);
  }
}

ReactDOM.render(
  <div>
    <List/>
  </div>,
  document.getElementById('root')
);
