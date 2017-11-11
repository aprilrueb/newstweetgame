// var mBanned = ['nbc', 'Peter Alexander', 'Mika Brzezinski', 'Robert Costa', 'Jose Diaz-Balart', 'Josh Barro', 'Jeremy Bash', 'Richard Engel', 'Willie Geist', 'Mike Barnicle', 'Chris Hayes', 'John Heilemann', 'Hugh Hewitt', 'Kasie Hunt', 'Hallie Jackson', 'Jack H. Jacobs', 'Chris Jansing', 'Steve Kornacki', 'Trymaine Lee', 'Richard Lui', 'Maddow', 'Matthews', 'Mark McKinnon', 'Ari Melber', 'Craig Melvin', 'Andrea Mitchell', 'Ayman Mohyeldin', 'Malcolm Nance', 'Kelly O\'Donnell', 'Lawrence', 'O\'Donnell', 'JJ Ramberg', 'Ron Reagan', 'Joy-Ann Reid', 'Thomas Roberts', 'Eugene Robinson', 'Stephanie Ruhle', 'Joe Scarborough', 'Steve Schmidt', 'Al Sharpton', 'Keir Simmons', 'Jacob Soboroff', 'Kate Snow', 'Bret Stephens', 'Chuck Todd', 'Katy Tur', 'Ali Velshi', 'Nicolle Wallace', 'Kristen Welker', 'Brian Williams', 'Alex Witt'];

var mBanned = ['nbc'];

var cBanned = ['cnn'];

var fBanned = ['fox'];

var msnbcBanned = []
mBanned.forEach(
    (name) => msnbcBanned.push(name.toLowerCase())
  );

var cnnBanned = [];
cBanned.forEach(
  (name) => cnnBanned.push(name.toLowerCase())
);

var foxBanned = [];
fBanned.forEach(
  (name) => foxBanned.push(name.toLowerCase())
);

module.exports = {msnbcBanned, cnnBanned, foxBanned}
