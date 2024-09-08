import { v4 as uuidv4 } from 'uuid';

const Getuuid = () => {
  const userTempId = localStorage.getItem('userTempId');

  if(userTempId){
    return userTempId;
  }else{
    const newUuid = uuidv4();
    localStorage.setItem('userTempId',newUuid);
  }
};

export default Getuuid;