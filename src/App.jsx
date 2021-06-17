import './App.css';
import { userData } from './userData.js';
import { useState } from 'react';
let ModalUserInfo = [userData[0]];
const UserCard = (props) => {
  const hendleModalOpen = (event) => {
    const userId = event.target.closest('.user-card').getAttribute('data-id')
    const ModalUser = userData.filter((user) => user._id === userId)
    ModalUserInfo = ModalUser
    props.setStateModal(!props.stateModal)
    document.querySelector('body').style.overflow = "hidden";
  }

  return (
    <div className="user-card" data-id={props.user._id} onClick={hendleModalOpen}>
      <Photo user={props.user}/>
      <hr/>
      <div className="info">
        <Name user={props.user}/>
        <Age user={props.user}/>
        <Gender user={props.user}/>
        <Balance user={props.user}/>
      </div>
    </div>
  )
}

const UserList = (props) => {
  return (
    <div className="user-list">
        {props.stateUsers.map(el => {
          return <UserCard user={el} key={el['_id']} stateModal={props.stateModal} setStateModal={props.setStateModal}/>
        })}
      </div>
  )
}

const Search = (props) => {
  const hendleSearch = (e) => {
    const {value} = e.target;
    if(value){
      const res = userData.filter(user => user.name.toLowerCase().includes(value.toLowerCase()));
      props.setStateUsers(res)
    }else{
      props.setStateUsers(userData)
    }
    
  }
  return (
    <div className="search">
      <input type="text" placeholder="Enter Client's name..." onChange={hendleSearch}/>
    </div>
  )
}

const Name = (props) => {
  return <div><b>Name: </b> {props.user.name}</div>
}

const Age = (props) => {
  return <div><b>Age: </b>{props.user.age}</div>
}

const Gender = (props) => {
  return <div><b>Gender: </b>{props.user.gender}</div>
}

const Balance = (props) => {
  return <div><b>Balance: </b>{props.user.balance}</div>
}

const Photo = (props) => {
  return <img src={props.user.picture} alt="#" />
}

const Header = (props) => {
  return (
    <div className="header">
      <Search stateUsers={props.stateUsers} setStateUsers={props.setStateUsers}/>
      <AgeSort stateUsers={props.stateUsers} setStateUsers={props.setStateUsers}/>
      <ResetButton setStateUsers={props.setStateUsers}/>
    </div>
  )
}

const AgeSort = (props) => {
  const hendleSort = (e) => {
    const {value} = e.target;
    const tmpUserList = Object.assign([], props.stateUsers);
    if(value === 'default') tmpUserList.sort((a, b) => a.index - b.index);
    if(value === 'old') tmpUserList.sort((a, b) => b.age - a.age);
    if(value === 'young') tmpUserList.sort((a, b) => a.age - b.age);
    props.setStateUsers(tmpUserList);
  }
  return (
    <div className="age-sort">
      <select name="sort-order" id="sort-select" onChange={hendleSort}>
        <option value="default">Default order</option>
        <option value="old">From Old to Yong</option>
        <option value="young">From Yong to Old</option>
      </select>
    </div>
  )
}

const ResetButton = (props) => {
  const hendleReset = (e) => {
    document.querySelector('.search input').value = '';
    document.querySelector('#sort-select').value = 'default';
    props.setStateUsers(userData)
  }
  return (
    <div className="reset" onClick={hendleReset}>
      <button>Reset to Default Setings</button>
    </div>
  )
}

// const ModalWindowLogic = () => {
//   const arrKeys = Object.keys(userData['0']);
//   let code = ``;
//   arrKeys.forEach(item => {
//     code += `<div>${item}: ${userData[0][item]}</div>`
//   })
//   return code;
// }

const ModalWindow = (props) => {
  const hendleModalWindowClose = (event) => {
      props.setStateModal(!props.stateModal)
      document.querySelector('body').style.overflow = "auto";
  }
  return (
    <div className="wrapper">
      <div className="shadow"/>
      <div className="user-modal">
        <div><img src="http://placehold.it/32x32" alt="#"/> </div>
        <div>_id: {ModalUserInfo && ModalUserInfo[0]._id}</div>
        <div>index: {ModalUserInfo[0].index}</div>
        <div>guid: {ModalUserInfo[0].guid}</div>
        <div>isActive: {ModalUserInfo[0].isActive}</div>
        <div>balance: {ModalUserInfo[0].balance}</div>
        <div>age: {ModalUserInfo[0].age}</div>
        <div>eyeColor: {ModalUserInfo[0].eyeColor}</div>
        <div>name: {ModalUserInfo[0].name}</div>
        <div>gender: {ModalUserInfo[0].gender}</div>
        <div>company: {ModalUserInfo[0].company}</div>
        <div>email: {ModalUserInfo[0].email}</div>
        <div>phone: {ModalUserInfo[0].phone}</div>
        <div>address: {ModalUserInfo[0].address}</div>
        <div>registered: {ModalUserInfo[0].registred}</div>
        <div>latitude: {ModalUserInfo[0].latitude}</div>
        <div>longitude: {ModalUserInfo[0].longitude}</div>
        <div>tags: {ModalUserInfo[0].tags}</div>
        {/* <div>friends: {ModalUserInfo[0].friends}</div> */}
        <div>greeting: {ModalUserInfo[0].greeting}</div>
        <div>favoriteFruit: {ModalUserInfo[0].favoriteFruit}</div>
        <div>
          <button onClick={hendleModalWindowClose}>Close</button>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [stateUsers, setStateUsers] = useState(userData)
  const [stateModal, setStateModal] = useState(false)
  return (
    <div className="App">
      <Header stateUsers={stateUsers} setStateUsers={setStateUsers}/>
      <UserList stateUsers={stateUsers} stateModal={stateModal} setStateModal={setStateModal}/>
      {stateModal && <ModalWindow stateModal={stateModal} setStateModal={setStateModal} />}
    </div>
  );
}

export default App;
