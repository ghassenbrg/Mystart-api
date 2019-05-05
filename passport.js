const passport=require('passport');
const JwtStrategy=require('passport-jwt').Strategy;
const {ExtractJwt}=require('passport-jwt');
const{JWT_SECRET}=require('./configuration')
passport.use(new JwtStrategy({
jwtFromRequest:ExtractJwt.fromHeader('authorization'),
},async(payload,done)=>{
try{
    //find the admin specified in token 
     const admin=await Admin.findById(payload.sub);
    //if admin doesn't exist, handle it
    if(!admin)
    {return done (null,false);
    } 

    //otherwise error
    done(null,admin);
}
catch(error){
    done(error,false);

}
}
 ));