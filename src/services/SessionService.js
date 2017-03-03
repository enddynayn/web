import Validator from 'validator';
import Socket from 'socket.io-client';

import {router} from '../router'

import NetworkService from './NetworkService'
import UserService from './UserService'


export default {
  socket: null,
  loading: false,
  currentSession: {
    sessionId: null,
    data: {}
  },

  getPartner(){
    var user = UserService.getUser(),
        session = this.currentSession.data;

    if (user.isVolunteer){
      return session.student;
    } else {
      return session.volunteer;
    }
  },

  startChatSocket(){
    this.socket = Socket(process.env.SOCKET_ADDRESS);

    this.socket.on('connect', () => {
			this.socket.emit('join', {
				sessionId: this.currentSession.sessionId,
				user: UserService.getUser()
			});
		});

    this.socket.on('session-change', (data) => {
      console.log('session-change', data);
      this.currentSession.sessionId = data._id;
      this.currentSession.data = data;

    })
    return this.socket;
  },

  startWhiteboard(){

  },

  endSession(){
    router.replace('/');
    this.socket.disconnect();
  },



  newSession(context, sessionType){
    return NetworkService.newSession(context, { sessionType }).then((res) => {
      let data = res.data || {},
          sessionId = data.sessionId;

      this.currentSession.sessionId = sessionId;

      console.log(sessionId);

      router.replace(`/session/${sessionId}`);

      return sessionId;
    })
  },

  useExistingSession(context, sessionId){
    return NetworkService.checkSession(context, { sessionId }).then((res) => {
      let data = res.data || {},
          sessionId = data.sessionId;

      this.currentSession.sessionId = sessionId;

      console.log(sessionId);
      if (sessionId){
        router.replace(`/session/${sessionId}`);
      } else {
        router.replace('/');
      }

      return sessionId;
    })
    this.currentSession.sessionId = sessionId;
  }
};