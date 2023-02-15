export const getEncUserId = currentUserId => {
  let encUserId = '';
  if (currentUserId != null) {
    let userId = parseInt(currentUserId);
    let digitEnc = '';
    while (userId > 0) {
      let remainder = userId % 10;
      let digit = remainder > 0 ? remainder - 1 : 9;
      userId = parseInt(userId / 10);
      switch (digit) {
        case 0:
          digitEnc = '#';
          break;
        case 1:
          digitEnc = 'K';
          break;
        case 2:
          digitEnc = '!';
          break;
        case 3:
          digitEnc = 'A';
          break;
        case 4:
          digitEnc = 'Z';
          break;
        case 5:
          digitEnc = '%';
          break;
        case 6:
          digitEnc = 'M';
          break;
        case 7:
          digitEnc = 'Y';
          break;
        case 8:
          digitEnc = 'X';
          break;
        case 9:
          digitEnc = '$';
          break;
      }
      encUserId = digitEnc + encUserId;
    }
  }
  return encUserId;
};
export const getEncTokenAnyUserId = userId => {
  let encUserId = '';
  try {
    if (userId != null) {
      let digitEnc = '';
      let position = userId.toString().length;
      let userInt = parseInt(userId);
      for (let i = 0; i < position; i++) {
        let remainder = parseInt(userInt % 10);
        userInt = userInt / 10;
        let remEven = (position - i - 1) % 2 == 0;
        let digit = 0;
        if (remEven) {
          if (remainder > 0) {
            digit = remainder - 1;
          } else {
            digit = 9;
          }
        } else {
          if (remainder == 9) {
            digit = 0;
          } else {
            digit = remainder + 1;
          }
        }
        switch (digit) {
          case 0:
            digitEnc = '#';
            break;
          case 1:
            digitEnc = 'K';
            break;
          case 2:
            digitEnc = '!';
            break;
          case 3:
            digitEnc = 'A';
            break;
          case 4:
            digitEnc = 'Z';
            break;
          case 5:
            digitEnc = '%';
            break;
          case 6:
            digitEnc = 'M';
            break;
          case 7:
            digitEnc = 'Y';
            break;
          case 8:
            digitEnc = 'X';
            break;
          case 9:
            digitEnc = '$';
            break;
        }
        encUserId = digitEnc + encUserId;
      }
    }
  } catch (e) {}
  return encUserId;
};
