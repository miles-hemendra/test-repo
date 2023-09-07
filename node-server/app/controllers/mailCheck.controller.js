const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const request = require('https');
const base64ToImage = require('base64-to-image');

const db = require("../models");
const User = db.user;
const Case = db.case;
const Image = db.image;
const UserCase = db.userCases;

const TelegramBot = require('node-telegram-bot-api');
const token = '1954905214:AAG2458SF7gDTbUdSUZvOf1FKm5v3Ce0saw';
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// If modifying these scopes, delete token.json.
const SCOPES = [
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/gmail.modify',
];

// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = './app/config/token.json';

// setInterval(startup,5000); 
// startup(); 
var telegramEventReadCount = 0;

// Load client secrets from a local file.
exports.startup = () => {
  fs.readFile('./app/config/credential.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);

    bot.on('message', (msg) => {
      console.log('msg', msg);
      const chatId = msg.chat.id;
      telegramEventReadCount++;
      if(telegramEventReadCount == 1) {
        bot.sendMessage(chatId, 'Thankyou for choosing Blackbox Electronics for all your CCTV services. You will get live update of motion detection related image and details here.')

        if(msg.from.username && msg.chat.id) {
          User.findOne({
            where: {
              telegramUsername: msg.from.username
            }
          }).then(user => {
            if(user) {
              user.update({
                telegramChatId: msg.chat.id
              }).then(user => {
                console.log('user\'s telegram chat id updated')
              })
            }
          })
        }
      }

      // bot.sendPhoto(chatId, 'https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297_960_720.jpg', {
      //   caption: 'testing from blackbox',
      //   disableNotification: true,
      // }).then(teler => {
      //   console.log('photo sent teleee', teler);
      // }).catch(teleErr => {
      //   console.log('teleErr', teleErr)
      // });
    })

    // Authorize a client with credentials, then call the Gmail API.
    authorize(JSON.parse(content), getRecentEmail);
  });
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  // console.log('1')
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  // console.log('2')
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}


/**
 * Get the recent email from your Gmail account
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function getRecentEmail(auth) {
  // console.log('3')
  const gmail = google.gmail({version: 'v1', auth});
  // Only get the recent email - 'maxResults' parameter
  try{
    gmail.users.messages.list({auth: auth, userId: 'me', maxResults: 1, q:'is:unread'}, (err, response) => {
      if (err) {
        console.log('The API returned an error: ' + err);
        return;
      }
    
      if(response['data']['messages']){
        // Get the message id which we will need to retreive tha actual message next.
        let message_id = response['data']['messages'][0]['id'];
        console.log('messageId: ', message_id);
        // Retreive the actual message using the message id
        gmail.users.messages.get({auth: auth, userId: 'me', 'id': message_id}, (err, response) => {
          if (err) {
            console.log('The API returned an error: ' + err);
            return;
          }
          console.log('parts: ', response.data.payload.parts);
          let message_raw = null;
          let attachmentId = null;
          if(response.data.payload.parts[0].body.size && response.data.payload.parts[0].body.size > 0) {
            message_raw = response.data.payload.parts[0].body.data;
            if(response.data.payload.parts.length > 1 && response.data.payload.parts[1].body.attachmentId) {
              attachmentId = response.data.payload.parts[1].body.attachmentId
              console.log('attachmentId: ', attachmentId);
              attacmentMimeType = response.data.payload.parts[1].mimeType
            }
          } else if(response.data.payload.parts[0].parts && response.data.payload.parts[0].parts.length && response.data.payload.parts[0].parts[0].body.size && response.data.payload.parts[0].parts[0].body.size > 0) {
            message_raw = response.data.payload.parts[0].parts[0].body.data;
            if(response.data.payload.parts.length > 1 && response.data.payload.parts[1].body.attachmentId) {
              attachmentId = response.data.payload.parts[1].body.attachmentId
              console.log('attachmentId: ', attachmentId);
              attacmentMimeType = response.data.payload.parts[1].mimeType
            }
          }
          if(message_raw){
            buff = new Buffer.from(message_raw, 'base64');  
            let message_text = buff.toString();
            console.log(message_text);
            if(message_text.length) {
              if(message_text.toLowerCase().includes('mob')) {
                let splitted = message_text.split(' ').join('').replace(/\s/g,'').split('mob');
                let contactNumber = splitted[1].substring(0, 10);
                console.log('contactnumber', contactNumber);
                
                if(message_text.split(' ').join('').toLowerCase().includes('video')) {
                  console.log('innn video loss');
                  request.get('https://m1.sarv.com/api/v2.0/sms_campaign.php?token=118140663560028a002ca796.45988311&user_id=37641696&route=TR&template_id=4256&sender_id=BBCCTV&language=EN&template=Dear+User+%0D%0AWe+have+noticed+a+VIDEO+LOSS+in+your+CCTV.%0D%0AKindly+Check%0D%0A%0D%0ABlackbox+Electronics&contact_numbers='+contactNumber)
                  User.findOne({
                    where: {
                        contact: contactNumber
                    }
                  }).then(user => {
                    if(user) {
                      Case.findOne({
                          where: {
                              name: 'Video Loss'
                          }
                      }).then(caseFound => {
                        user.getUserSI().then(si => {
                          user.addCase(caseFound, {through: {status: 'new', siId: si.id}}).then(() => {
                              console.log('Video Loss Case added for ' + user.fname + ' ' + user.lname)
                          })
                        })
                      })
                    } else {
                      console.log('User not found.')
                    }
                  })
                } else if(message_text.split(' ').join('').toLowerCase().includes('motion')) {
                  console.log('innn motion detection');
                  request.get('https://obd37.sarv.com/api/voice/voice_broadcast_tts.php?username=u4236&token=v06Mdf&plan_id=9851&content=This+is+a+dummy+call+from+black+box+electronics+for+testing+of+call+functionality&caller_id=7587099394&contact_numbers='+contactNumber+'&retry_json={"FNA":"2","FBZ":"2","FCG":"2","FFL":"2"}');
                  User.findOne({
                    where: {
                      contact: contactNumber
                    }
                    }).then(user => {
                      if(user) {
                        Case.findOne({
                          where: {
                              name: 'Motion Detection'
                          }
                        }).then(caseFound => {
                          console.log('caseFound-->> ', caseFound);
                          user.getUserSI().then(si => {
                            UserCase.create({
                              userId: user.id,
                              siId: si.id,
                              caseId: caseFound.id,
                              status: 'new'
                            }).then(userCase => {
                              console.log('Motion Detection Case added for ' + user.fname + ' ' + user.lname);
                              console.log('userCase before', userCase)
                              if(attachmentId) {
                                gmail.users.messages.attachments.get({
                                  auth: auth,
                                  userId: 'me',
                                  messageId: message_id,
                                  id: attachmentId
                                }, (err, attachmentData) => {
                                  if (err) return console.log('Error getting attachment: ' + err)
                                  if(attachmentData && attachmentData.data.size > 0) {
                                    // console.log('attachment1: ', attachmentData)
                                    // attachBuff = new Buffer.from(attachmentData.data.data, 'base64');  
                                    // console.log('attachmentBuff: ', attachBuff);
                                    // console.log('attachmentBuff11-->: ', attachBuff.toString());
                                    // let data_uri_prefix = "data:" + attacmentMimeType + ";base64,";
                                    let data_uri_prefix = "data:image/jpeg;base64,";
                                    let buf = new Buffer.from(attachmentData.data.data, 'base64');
                                    let image = buf.toString('base64');

                                    image = data_uri_prefix + image;
                                    console.log('image: ', image);
                                    let path = './dist/snapshots/';
                                    if (!fs.existsSync(path)){
                                      fs.mkdirSync(path);
                                    }
                                    path = './dist/snapshots/'+user.fname+'_'+user.contact+'/';
                                    let pathToSave = '/snapshots/'+user.fname+'_'+user.contact+'/'
                                    if (!fs.existsSync(path)){
                                      fs.mkdirSync(path);
                                    }
                                    let unique_id = 0;
                                    // let path = './dist/snapshots/'+user.email.substr(0, addy.indexOf('@'))+'/';
                                    let savedImage = base64ToImage(image, path);
                                    console.log('saved', savedImage);
                                    let min = Math.ceil(100000000);
                                    let max = Math.floor(999999999);
                                    unique_id = Math.floor(Math.random() * (max - min + 1)) + min;
                                    console.log('uniqueId', unique_id);
                                    Image.create({
                                      name: savedImage.fileName,
                                      uniqueId: unique_id,
                                      path: pathToSave
                                    }).then(image => {
                                      // UserCase.findAll({
                                      //   limit: 1,
                                      //   order: [['createdAt', 'DESC']]
                                      // }).then(userCases => {
                                        console.log('userCase_after', userCase);
                                        userCase.addImage(image).then(() => {
                                          request.get('https://m1.sarv.com/api/v2.0/sms_campaign.php?token=118140663560028a002ca796.45988311&user_id=37641696&route=TR&template_id=5870&sender_id=BBCCTV&language=EN&template=We+detected+some+motion+on+your+cctv.%0D%0AView+Image%3A+http%3A%2F%2Fblackboxelectronics.in%2F%23%2Fview-image%2F'+image.uniqueId+'%0D%0A%0D%0ARegards%2C+Blackbox+Electronics&contact_numbers='+user.contact);
                                          if(user.telegramChatId) {
                                            bot.sendPhoto(user.telegramChatId, 'http://blackboxelectronics.in'+image.path+image.name, {
                                              // bot.sendPhoto(user.telegramChatId, 'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80', {
                                              caption: 'Motion Detection Image taken at '+image.createdAt,
                                              disableNotification: true,
                                            }).then(teler => {
                                              console.log('photo sent teleee', teler);
                                            }).catch(teleErr => {
                                              console.log('teleErr', teleErr)
                                            });
                                          }
                                        })
                                      // })
                                    })
                                  }
                                })
                              }
                            }).catch(function(err) {
                              // print the error details
                              console.log(err);
                          });
                          })
                        })
                      } else {
                          console.log('User not found.')
                      }
                    })
                  }
              } else {
                  console.log('Mobile number not present');
              }
            }
            let threadId = response.data.threadId;
            gmail.users.threads.modify({removeLabelIds:["UNREAD"],userId:"me",id:threadId});
          } else {
            console.log('No new mail found..');    
          } 
        });
      }  
      else{
        console.log('No new mail found...');
      }  
    });
  }
  catch(e){
    console.log(e);
  }
}