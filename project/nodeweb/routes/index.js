/* GET home page. */
exports.checkLogin = function(req, res, next){
	if (!req.session.admin) {
		res.redirect('/login');
	}
	next();
}

exports.checkLogout = function(req,res,next){
	if (req.session.admin){
		res.redirect('/admin');
	}
	next();
}

exports.adminLogin = function(db) {
	return function(req, res) {
		var adminName = req.body.adminName;
		var adminPassword = req.body.adminPassword;
		var collection = db.get('admin');
		//select (ziduan) from (biao) where (tiaojian)
		collection.findOne({"adminName": adminName},{},function(err,doc){		   if (doc == null) res.redirect('/login')
			else {
			if (doc.adminPassword == adminPassword) {
				req.session.admin = doc;
				res.redirect('/admin');
			}
			else{ res.redirect('/login');}
			}
		});
	}
}

exports.adminLogout = function(req, res) {
	req.session.admin = null;
	res.redirect('/login');
}

exports.index = function(db) {
	return function(req, res) {
		var collection = db.get('skill');
		collection.find({},{},function(err, docs){
			var collection1 = db.get('classify'); 
			collection1.find({},{},function(err1,doc1){
				var collection2 = db.get('content');
				collection2.find({},{},function(err2,doc2){
					res.render('index',{"skillList":docs,"classifyList":doc1,"contentList":doc2});
				});
			});
		});
	}
}

exports.userlist = function(db) {
    return function(req, res) {
        var collection = db.get('user');
        collection.find({},{},function(e,docs){
            res.render('userlist', {
                "userlist" : docs
            });
        });
    };
};

exports.login = function(req, res){
  res.render('login',{});
};

exports.admin = function(db){ 
	return function(req, res) {
		var coll1 = db.get('content');
		coll1.find({"contentstate" :"1"},{},function(e,docs){
			console.log(docs.length);
			var coll2 = db.get('content');
			coll2.find({},{},function(e,docs2){
				var coll3 = db.get('skill');
				coll3.find({},{},function(e,docs3){
					var coll4 = db.get('classify');
					coll4.find({},{},function(e,docs4){
						res.render('admin',{
							"posterLen" : docs.length,
							"contentLen" : docs2.length,
							"skillLen" : docs3.length,
							"classifyLen" : docs4.length
						});
					});
				});
			});

		});
	}
 }




exports.newuser = function(req, res){
  res.render('newuser', { title: 'Add New User' });
};

exports.sendMail = function(req, res) {
	var name = req.body.Name;
	var email = req.body.Email;
	var message = req.body.Message;
	var nodemailer = require('nodemailer');
	var transporter = nodemailer.createTransport({
		service : 'Gmail',
		auth: {
			user : 'druidshan@gmail.com',
			pass : 'sy6479626886'
		}
	});
	var mailOptions = {
		from : 'Ying',
		to : 'druidshan@gmail.com',
		subject : 'contect me',
		text : '',
		html : 'Here is comment from ' + name + '<br>his email is ' + email + '<br>message is ' + message
	};
	transporter.sendMail(mailOptions, function(err, info){
		if (err) console.log(err);
		else console.log('Message sent:' + info.response);
	});
	res.redirect('/');
}



//skill
exports.skill = function(db) {
	return function(req, res) {
		var collection = db.get('skill');
		collection.find({},{},function(err, docs){
			res.render('skill',{"skillList":docs});
		});
	}
}

exports.skillupdate = function(db) {
	return function(req, res) {
		var skillname = req.body.skillname;
		var skillval = req.body.skillval;
		var skillid = req.query._id;
		var collection = db.get('skill');
		collection.update({"_id":skillid},{$set:{"skillname":skillname, "skillval":skillval}}, function(err,docs){
			if (err) res.send("error");
			else res.redirect('/skill');
		});
	}
}

exports.addSkill = function(req, res){
  res.render('addSkill', {});
};


exports.deleteSkill = function(db) {
	return function(req, res) {
		var id = req.query._id;
		var collection = db.get('skill');
		collection.remove({
			"_id" : id
		},{},function(err, doces){
			if (err) res.send("error");
			res.redirect('/skill');
		});

	}
}


exports.addSkillfunction = function(db) {
	return function(req, res) { 
		var skillname = req.body.skillname;
		var skillval = req.body.skillval;
		var collection = db.get('skill');
		collection.insert({
			"skillname" : skillname,
			"skillval" : skillval
		},function(err, doces){
			if (err) res.send("error");
			res.location('/skill');
			res.redirect('/skill');
		});
	}
}




//classify
exports.classify = function(db) {
	return function(req, res) {
		var collection = db.get('classify');
		collection.find({},{},function(err, docs){
			res.render('classify',{"classifyList":docs});
		});
	}
}

exports.classifyupdate = function(db) {
	return function(req, res) {
		var classifyname = req.body.classifyname;
		var classifylogo = req.body.classifylogo;
		var collection = db.get('classify');
		collection.update({"_id":classifyid},{$set:{"classifyname":classifyname, "classifylogo":classifylogo}}, function(err,docs){
			if (err) res.send("error");
			else res.redirect('/classify');
		});
	}
}

exports.addClassify = function(req, res){
  res.render('addClassify', {});
};



exports.addClassifyfunction = function(db) {
	return function(req, res) { 
		var classifyname = req.body.classifyname;
		var classifylogo = req.body.classifylogo;
		var classifydate = new Date().toISOString();
		classifydate = classifydate.substring(0, 10);

		var collection = db.get('classify');
		collection.insert({
			"classifyname" : classifyname,
			"classifylogo" : classifylogo,
			"classifydate" : classifydate

		},function(err, doces){
			if (err) res.send("error");
			res.location('/classify');
			res.redirect('/classify');
		});
	}
}


exports.deleteClassify = function(db) {
	return function(req, res) {
		var id = req.query._id;
		var collection = db.get('classify');
		collection.remove({
			"_id" : id
		},{},function(err, doces){
			if (err) res.send("error");
			res.redirect('/classify');
		});

	}
}




//content
exports.content = function(db) {
	return function(req, res) {
		var collection = db.get('content');
		collection.find({},{},function(err, docs){
			res.render('content',{"contentList":docs});
		});
	}
}

exports.updateContentfunction = function(db) {
	return function(req, res) { 
		var contenttitle = req.body.title;
		var contentdate = new Date().toISOString();
		contentdate = contentdate.substring(0, 10);
		var contentstate = "0";
		var contenturl = req.body.url;
		var contentclassify = req.body.classify;
		var contentcontent = req.body.content;
		var contentwebsite = req.body.website;
		var id = req.body.id;
		var collection = db.get('content');
		collection.update({"_id":id},{$set:{
			"contenttitle" : contenttitle,
			"contentdate" : contentdate,
			"contentstate" : contentstate,
			"contenturl" : contenturl,
			"contentclassify" : contentclassify,
			"contentcontent" : contentcontent,
			"contentwebsite" : contentwebsite
		}},{upsert:true},function(err, doces){
			if (err) res.send("error");
			res.location('/content');
			res.redirect('/content');
		});
	}
}


exports.addContent = function(db){ 
	return function(req, res) {
		var collection = db.get('classify');
		
		collection.find({},{},function(e, docs){
  			res.render('addContent',{"classifylist":docs});
		});
	}
}



exports.updateContent = function(db){ 
	return function(req, res) {
		var collection = db.get('content');
		var id = req.query.id;
		collection.findOne({"_id":id},{},function(e, docs){
				var collection1 = db.get('classify');
		
		collection1.find({},{},function(e, docs1){
  	  			res.render('updateContent',{"content":docs,"classifylist":docs1});
		});
		});
	}
}

exports.deleteContent = function(db) {
	return function(req, res) {
		var id = req.query._id;
		var collection = db.get('content');
		collection.remove({
			"_id" : id
		},{},function(err, doces){
			if (err) res.send("error");
			res.redirect('/content');
		});

	}
}


exports.addContentfunction = function(db) {
	return function(req, res) { 
		var contenttitle = req.body.title;
		var contentdate = new Date().toISOString();
		contentdate = contentdate.substring(0, 10);
		var contentstate = "0";
		var contenturl = req.body.url
		var contentclassify = req.body.classify;
		var contentcontent = req.body.content;
		var contentwebsite = req.body.website;
		var collection = db.get('content');
		collection.insert({
			"contenttitle" : contenttitle,
			"contentdate" : contentdate,
			"contentstate" : contentstate,
			"contenturl" : contenturl,
			"contentclassify" : contentclassify,
			"contentcontent" : contentcontent,
			"contentwebsite" : contentwebsite
		},function(err, doces){
			if (err) res.send("error");
			res.location('/content');
			res.redirect('/content');
		});
	}
}








//poster
exports.poster = function(db) {
	return function(req, res) {
		var collection = db.get('content');
		collection.find({},{},function(err, docs){
			res.render('poster',{"contentlist":docs});
		});
	}
}


exports.setPoster = function(db) {
	return function(req, res) {
		var id = req.query._id;
		var state = req.query.state;
		console.log(id + " "+ state);
		var collection = db.get('content');
		collection.update({"_id":id},{$set:{"contentstate":state}},function(err, docs){
			if (err) res.send("error");
			else res.redirect('/poster');
		});
	}
}








exports.email = function(req, res){
  res.render('email',{});
}


exports.adduser = function(db) {
    return function(req, res) {

        var userName = req.body.userName;
        var userEmail = req.body.password;

        // Set our collection
        var collection = db.get('user');

        // Submit to the DB
        collection.insert({
            "userName" : userName,
            "password" : userEmail
        }, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                // If it worked, set the header so the address bar doesn't still say /adduser
                res.location("userlist");
                // And forward to success page
                res.redirect("userlist");
            }
        });

    }
}
