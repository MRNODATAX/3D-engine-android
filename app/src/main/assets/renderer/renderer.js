var MateRendererBundle=(()=>{typeof Object.fromEntries!="function"&&(Object.fromEntries=function(e){let t={};for(let n of e){let r=Object(n);t[r[0]]=r[1]}return t});typeof Object.hasOwn!="function"&&(Object.hasOwn=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)});typeof Array.prototype.at!="function"&&(Array.prototype.at=function(e){let t=this.length>>>0,n=Math.trunc(e)||0;return n<0&&(n+=t),n<0||n>=t?void 0:this[n]});typeof String.prototype.at!="function"&&(String.prototype.at=function(e){return Array.from(this).at(e)});typeof String.prototype.replaceAll!="function"&&(String.prototype.replaceAll=function(e,t){return e instanceof RegExp?this.replace(e,t):this.split(String(e)).join(String(t))});var $h=0,pc=1,jh=2;var mc=1,Kh=2,Un=3,en=0,Ut=1,Xt=2,oi=0,Fi=1,gc=2,_c=3,xc=4,Jh=5,xi=100,Qh=101,ed=102,td=103,nd=104,id=200,rd=201,sd=202,od=203,ko=204,Ho=205,ad=206,ld=207,cd=208,ud=209,hd=210,dd=211,fd=212,pd=213,md=214,ra=0,sa=1,oa=2,Bi=3,aa=4,la=5,ca=6,ua=7,vc=0,gd=1,_d=2,bn=0,xd=1,vd=2,yd=3,Md=4,Ed=5,Sd=6,Td=7,sc="attached",bd="detached",yc=300,qi=301,Yi=302,ha=303,da=304,Gs=306,vi=1e3,Cn=1001,wr=1002,Lt=1003,fa=1004;var Zi=1005;var Gt=1006,kr=1007;var wn=1008;var An=1009,Mc=1010,Ec=1011,Hr=1012,pa=1013,Si=1014,fn=1015,Vr=1016,ma=1017,ga=1018,zr=1020,Sc=35902,Tc=1021,bc=1022,rn=1023,Ar=1026,Gr=1027,_a=1028,xa=1029,wc=1030,va=1031;var ya=1033,Ws=33776,Xs=33777,qs=33778,Ys=33779,Ma=35840,Ea=35841,Sa=35842,Ta=35843,ba=36196,wa=37492,Aa=37496,Ra=37808,Ca=37809,Pa=37810,Ia=37811,La=37812,Na=37813,Ua=37814,Da=37815,Oa=37816,Fa=37817,Ba=37818,ka=37819,Ha=37820,Va=37821,Zs=36492,za=36494,Ga=36495,Ac=36283,Wa=36284,Xa=36285,qa=36286,Ya=2200,Za=2201,wd=2202,ki=2300,Hi=2301,Bo=2302,Di=2400,Oi=2401,xs=2402,$a=2500,Ad=2501,Rc=0,$s=1,Wr=2,Rd=3200,Cd=3201;var js=0,Pd=1,ai="",Tt="srgb",Nt="srgb-linear",vs="linear",lt="srgb";var Ui=7680;var oc=519,Id=512,Ld=513,Nd=514,Cc=515,Ud=516,Dd=517,Od=518,Fd=519,Vo=35044,Pc=35048;var Ic="300 es",Sn=2e3,ys=2001;var Pn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let r=n.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}},Dt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],hh=1234567,gs=Math.PI/180,Vi=180/Math.PI;function Tn(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Dt[i&255]+Dt[i>>8&255]+Dt[i>>16&255]+Dt[i>>24&255]+"-"+Dt[e&255]+Dt[e>>8&255]+"-"+Dt[e>>16&15|64]+Dt[e>>24&255]+"-"+Dt[t&63|128]+Dt[t>>8&255]+"-"+Dt[t>>16&255]+Dt[t>>24&255]+Dt[n&255]+Dt[n>>8&255]+Dt[n>>16&255]+Dt[n>>24&255]).toLowerCase()}function qe(i,e,t){return Math.max(e,Math.min(t,i))}function Lc(i,e){return(i%e+e)%e}function Nm(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function Um(i,e,t){return i!==e?(t-i)/(e-i):0}function _s(i,e,t){return(1-t)*i+t*e}function Dm(i,e,t,n){return _s(i,e,1-Math.exp(-t*n))}function Om(i,e=1){return e-Math.abs(Lc(i,e*2)-e)}function Fm(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Bm(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function km(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Hm(i,e){return i+Math.random()*(e-i)}function Vm(i){return i*(.5-Math.random())}function zm(i){i!==void 0&&(hh=i);let e=hh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Gm(i){return i*gs}function Wm(i){return i*Vi}function Xm(i){return(i&i-1)===0&&i!==0}function qm(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Ym(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Zm(i,e,t,n,r){let s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),c=s((e+n)/2),u=o((e+n)/2),h=s((e-n)/2),d=o((e-n)/2),f=s((n-e)/2),p=o((n-e)/2);switch(r){case"XYX":i.set(a*u,l*h,l*d,a*c);break;case"YZY":i.set(l*d,a*u,l*h,a*c);break;case"ZXZ":i.set(l*h,l*d,a*u,a*c);break;case"XZX":i.set(a*u,l*p,l*f,a*c);break;case"YXY":i.set(l*f,a*u,l*p,a*c);break;case"ZYZ":i.set(l*p,l*f,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function En(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function at(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var De={DEG2RAD:gs,RAD2DEG:Vi,generateUUID:Tn,clamp:qe,euclideanModulo:Lc,mapLinear:Nm,inverseLerp:Um,lerp:_s,damp:Dm,pingpong:Om,smoothstep:Fm,smootherstep:Bm,randInt:km,randFloat:Hm,randFloatSpread:Vm,seededRandom:zm,degToRad:Gm,radToDeg:Wm,isPowerOfTwo:Xm,ceilPowerOfTwo:qm,floorPowerOfTwo:Ym,setQuaternionFromProperEuler:Zm,normalize:at,denormalize:En},Ae=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(qe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*r+e.x,this.y=s*r+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Q=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,o,a){let l=n[r+0],c=n[r+1],u=n[r+2],h=n[r+3],d=s[o+0],f=s[o+1],p=s[o+2],_=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(a===1){e[t+0]=d,e[t+1]=f,e[t+2]=p,e[t+3]=_;return}if(h!==_||l!==d||c!==f||u!==p){let g=1-a,m=l*d+c*f+u*p+h*_,y=m>=0?1:-1,S=1-m*m;if(S>Number.EPSILON){let A=Math.sqrt(S),R=Math.atan2(A,m*y);g=Math.sin(g*R)/A,a=Math.sin(a*R)/A}let v=a*y;if(l=l*g+d*v,c=c*g+f*v,u=u*g+p*v,h=h*g+_*v,g===1-a){let A=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=A,c*=A,u*=A,h*=A}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,r,s,o){let a=n[r],l=n[r+1],c=n[r+2],u=n[r+3],h=s[o],d=s[o+1],f=s[o+2],p=s[o+3];return e[t]=a*p+u*h+l*f-c*d,e[t+1]=l*p+u*d+c*h-a*f,e[t+2]=c*p+u*f+a*d-l*h,e[t+3]=u*p-a*h-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(r/2),h=a(s/2),d=l(n/2),f=l(r/2),p=l(s/2);switch(o){case"XYZ":this._x=d*u*h+c*f*p,this._y=c*f*h-d*u*p,this._z=c*u*p+d*f*h,this._w=c*u*h-d*f*p;break;case"YXZ":this._x=d*u*h+c*f*p,this._y=c*f*h-d*u*p,this._z=c*u*p-d*f*h,this._w=c*u*h+d*f*p;break;case"ZXY":this._x=d*u*h-c*f*p,this._y=c*f*h+d*u*p,this._z=c*u*p+d*f*h,this._w=c*u*h-d*f*p;break;case"ZYX":this._x=d*u*h-c*f*p,this._y=c*f*h+d*u*p,this._z=c*u*p-d*f*h,this._w=c*u*h+d*f*p;break;case"YZX":this._x=d*u*h+c*f*p,this._y=c*f*h+d*u*p,this._z=c*u*p-d*f*h,this._w=c*u*h-d*f*p;break;case"XZY":this._x=d*u*h-c*f*p,this._y=c*f*h-d*u*p,this._z=c*u*p+d*f*h,this._w=c*u*h+d*f*p;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],h=t[10],d=n+a+h;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-l)*f,this._y=(s-c)*f,this._z=(o-r)*f}else if(n>a&&n>h){let f=2*Math.sqrt(1+n-a-h);this._w=(u-l)/f,this._x=.25*f,this._y=(r+o)/f,this._z=(s+c)/f}else if(a>h){let f=2*Math.sqrt(1+a-n-h);this._w=(s-c)/f,this._x=(r+o)/f,this._y=.25*f,this._z=(l+u)/f}else{let f=2*Math.sqrt(1+h-n-a);this._w=(o-r)/f,this._x=(s+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(qe(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-n*c,this._z=s*u+o*c+n*l-r*a,this._w=o*u-n*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,r=this._y,s=this._z,o=this._w,a=o*e._w+n*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=r,this._z=s,this;let l=1-a*a;if(l<=Number.EPSILON){let f=1-t;return this._w=f*o+t*this._w,this._x=f*n+t*this._x,this._y=f*r+t*this._y,this._z=f*s+t*this._z,this.normalize(),this}let c=Math.sqrt(l),u=Math.atan2(c,a),h=Math.sin((1-t)*u)/c,d=Math.sin(t*u)/c;return this._w=o*h+this._w*d,this._x=n*h+this._x*d,this._y=r*h+this._y*d,this._z=s*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},w=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(dh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(dh.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*n),u=2*(a*t-s*r),h=2*(s*n-o*t);return this.x=t+l*c+o*h-a*u,this.y=n+l*u+a*c-s*h,this.z=r+l*h+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this.z=qe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this.z=qe(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=r*l-s*a,this.y=s*o-n*l,this.z=n*a-r*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ll.copy(this).projectOnVector(e),this.sub(Ll)}reflect(e){return this.sub(Ll.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(qe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Ll=new w,dh=new Q,Ce=class i{constructor(e,t,n,r,s,o,a,l,c){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,l,c)}set(e,t,n,r,s,o,a,l,c){let u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],h=n[7],d=n[2],f=n[5],p=n[8],_=r[0],g=r[3],m=r[6],y=r[1],S=r[4],v=r[7],A=r[2],R=r[5],I=r[8];return s[0]=o*_+a*y+l*A,s[3]=o*g+a*S+l*R,s[6]=o*m+a*v+l*I,s[1]=c*_+u*y+h*A,s[4]=c*g+u*S+h*R,s[7]=c*m+u*v+h*I,s[2]=d*_+f*y+p*A,s[5]=d*g+f*S+p*R,s[8]=d*m+f*v+p*I,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-n*s*u+n*a*l+r*s*c-r*o*l}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=u*o-a*c,d=a*l-u*s,f=c*s-o*l,p=t*h+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/p;return e[0]=h*_,e[1]=(r*c-u*n)*_,e[2]=(a*n-r*o)*_,e[3]=d*_,e[4]=(u*t-r*l)*_,e[5]=(r*s-a*t)*_,e[6]=f*_,e[7]=(n*l-c*t)*_,e[8]=(o*t-n*s)*_,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,o,a){let l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Nl.makeScale(e,t)),this}rotate(e){return this.premultiply(Nl.makeRotation(-e)),this}translate(e,t){return this.premultiply(Nl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Nl=new Ce;function Nc(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Rr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Bd(){let i=Rr("canvas");return i.style.display="block",i}var fh={};function zi(i){i in fh||(fh[i]=!0,console.warn(i))}function kd(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}var ph=new Ce().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),mh=new Ce().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function $m(){let i={enabled:!0,workingColorSpace:Nt,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===lt&&(r.r=Zn(r.r),r.g=Zn(r.g),r.b=Zn(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===lt&&(r.r=br(r.r),r.g=br(r.g),r.b=br(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===ai?vs:this.spaces[r].transfer},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return zi("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return zi("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Nt]:{primaries:e,whitePoint:n,transfer:vs,toXYZ:ph,fromXYZ:mh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Tt},outputColorSpaceConfig:{drawingBufferColorSpace:Tt}},[Tt]:{primaries:e,whitePoint:n,transfer:lt,toXYZ:ph,fromXYZ:mh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Tt}}}),i}var je=$m();function Zn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function br(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var hr,zo=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{hr===void 0&&(hr=Rr("canvas")),hr.width=e.width,hr.height=e.height;let r=hr.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=hr}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Rr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Zn(s[o]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Zn(t[n]/255)*255):t[n]=Zn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},jm=0,Cr=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:jm++}),this.uuid=Tn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Ul(r[o].image)):s.push(Ul(r[o]))}else s=Ul(r);n.url=s}return t||(e.images[this.uuid]=n),n}};function Ul(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?zo.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Km=0,Dl=new w,Pt=class i extends Pn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=Cn,r=Cn,s=Gt,o=wn,a=rn,l=An,c=i.DEFAULT_ANISOTROPY,u=ai){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Km++}),this.uuid=Tn(),this.name="",this.source=new Cr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ae(0,0),this.repeat=new Ae(1,1),this.center=new Ae(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ce,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Dl).x}get height(){return this.source.getSize(Dl).y}get depth(){return this.source.getSize(Dl).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==yc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case vi:e.x=e.x-Math.floor(e.x);break;case Cn:e.x=e.x<0?0:1;break;case wr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case vi:e.y=e.y-Math.floor(e.y);break;case Cn:e.y=e.y<0?0:1;break;case wr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Pt.DEFAULT_IMAGE=null;Pt.DEFAULT_MAPPING=yc;Pt.DEFAULT_ANISOTROPY=1;var Je=class i{constructor(e=0,t=0,n=0,r=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s,l=e.elements,c=l[0],u=l[4],h=l[8],d=l[1],f=l[5],p=l[9],_=l[2],g=l[6],m=l[10];if(Math.abs(u-d)<.01&&Math.abs(h-_)<.01&&Math.abs(p-g)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+_)<.1&&Math.abs(p+g)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let S=(c+1)/2,v=(f+1)/2,A=(m+1)/2,R=(u+d)/4,I=(h+_)/4,L=(p+g)/4;return S>v&&S>A?S<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(S),r=R/n,s=I/n):v>A?v<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(v),n=R/r,s=L/r):A<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(A),n=I/s,r=L/s),this.set(n,r,s,t),this}let y=Math.sqrt((g-p)*(g-p)+(h-_)*(h-_)+(d-u)*(d-u));return Math.abs(y)<.001&&(y=1),this.x=(g-p)/y,this.y=(h-_)/y,this.z=(d-u)/y,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this.z=qe(this.z,e.z,t.z),this.w=qe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this.z=qe(this.z,e,t),this.w=qe(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Go=class extends Pn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Gt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Je(0,0,e,t),this.scissorTest=!1,this.viewport=new Je(0,0,e,t);let r={width:e,height:t,depth:n.depth},s=new Pt(r);this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:Gt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isArrayTexture=this.textures[r].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new Cr(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},In=class extends Go{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Ms=class extends Pt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Lt,this.minFilter=Lt,this.wrapR=Cn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Wo=class extends Pt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Lt,this.minFilter=Lt,this.wrapR=Cn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var It=class{constructor(e=new w(1/0,1/0,1/0),t=new w(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(vn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(vn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=vn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,vn):vn.fromBufferAttribute(s,o),vn.applyMatrix4(e.matrixWorld),this.expandByPoint(vn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),po.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),po.copy(n.boundingBox)),po.applyMatrix4(e.matrixWorld),this.union(po)}let r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,vn),vn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ls),mo.subVectors(this.max,ls),dr.subVectors(e.a,ls),fr.subVectors(e.b,ls),pr.subVectors(e.c,ls),hi.subVectors(fr,dr),di.subVectors(pr,fr),Pi.subVectors(dr,pr);let t=[0,-hi.z,hi.y,0,-di.z,di.y,0,-Pi.z,Pi.y,hi.z,0,-hi.x,di.z,0,-di.x,Pi.z,0,-Pi.x,-hi.y,hi.x,0,-di.y,di.x,0,-Pi.y,Pi.x,0];return!Ol(t,dr,fr,pr,mo)||(t=[1,0,0,0,1,0,0,0,1],!Ol(t,dr,fr,pr,mo))?!1:(go.crossVectors(hi,di),t=[go.x,go.y,go.z],Ol(t,dr,fr,pr,mo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,vn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(vn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(zn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),zn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),zn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),zn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),zn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),zn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),zn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),zn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(zn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},zn=[new w,new w,new w,new w,new w,new w,new w,new w],vn=new w,po=new It,dr=new w,fr=new w,pr=new w,hi=new w,di=new w,Pi=new w,ls=new w,mo=new w,go=new w,Ii=new w;function Ol(i,e,t,n,r){for(let s=0,o=i.length-3;s<=o;s+=3){Ii.fromArray(i,s);let a=r.x*Math.abs(Ii.x)+r.y*Math.abs(Ii.y)+r.z*Math.abs(Ii.z),l=e.dot(Ii),c=t.dot(Ii),u=n.dot(Ii);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}var Jm=new It,cs=new w,Fl=new w,Yt=class{constructor(e=new w,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Jm.setFromPoints(e).getCenter(n);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;cs.subVectors(e,this.center);let t=cs.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(cs,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Fl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(cs.copy(e.center).add(Fl)),this.expandByPoint(cs.copy(e.center).sub(Fl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Gn=new w,Bl=new w,_o=new w,fi=new w,kl=new w,xo=new w,Hl=new w,yi=class{constructor(e=new w,t=new w(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Gn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Gn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Gn.copy(this.origin).addScaledVector(this.direction,t),Gn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Bl.copy(e).add(t).multiplyScalar(.5),_o.copy(t).sub(e).normalize(),fi.copy(this.origin).sub(Bl);let s=e.distanceTo(t)*.5,o=-this.direction.dot(_o),a=fi.dot(this.direction),l=-fi.dot(_o),c=fi.lengthSq(),u=Math.abs(1-o*o),h,d,f,p;if(u>0)if(h=o*l-a,d=o*a-l,p=s*u,h>=0)if(d>=-p)if(d<=p){let _=1/u;h*=_,d*=_,f=h*(h+o*d+2*a)+d*(o*h+d+2*l)+c}else d=s,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*l)+c;else d=-s,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*l)+c;else d<=-p?(h=Math.max(0,-(-o*s+a)),d=h>0?-s:Math.min(Math.max(-s,-l),s),f=-h*h+d*(d+2*l)+c):d<=p?(h=0,d=Math.min(Math.max(-s,-l),s),f=d*(d+2*l)+c):(h=Math.max(0,-(o*s+a)),d=h>0?s:Math.min(Math.max(-s,-l),s),f=-h*h+d*(d+2*l)+c);else d=o>0?-s:s,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(Bl).addScaledVector(_o,d),f}intersectSphere(e,t){Gn.subVectors(e.center,this.origin);let n=Gn.dot(this.direction),r=Gn.dot(Gn)-n*n,s=e.radius*e.radius;if(r>s)return null;let o=Math.sqrt(s-r),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,o,a,l,c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),u>=0?(s=(e.min.y-d.y)*u,o=(e.max.y-d.y)*u):(s=(e.max.y-d.y)*u,o=(e.min.y-d.y)*u),n>o||s>r||((s>n||isNaN(n))&&(n=s),(o<r||isNaN(r))&&(r=o),h>=0?(a=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(a=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),n>l||a>r)||((a>n||n!==n)&&(n=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Gn)!==null}intersectTriangle(e,t,n,r,s){kl.subVectors(t,e),xo.subVectors(n,e),Hl.crossVectors(kl,xo);let o=this.direction.dot(Hl),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;fi.subVectors(this.origin,e);let l=a*this.direction.dot(xo.crossVectors(fi,xo));if(l<0)return null;let c=a*this.direction.dot(kl.cross(fi));if(c<0||l+c>o)return null;let u=-a*fi.dot(Hl);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ve=class i{constructor(e,t,n,r,s,o,a,l,c,u,h,d,f,p,_,g){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,l,c,u,h,d,f,p,_,g)}set(e,t,n,r,s,o,a,l,c,u,h,d,f,p,_,g){let m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=r,m[1]=s,m[5]=o,m[9]=a,m[13]=l,m[2]=c,m[6]=u,m[10]=h,m[14]=d,m[3]=f,m[7]=p,m[11]=_,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,r=1/mr.setFromMatrixColumn(e,0).length(),s=1/mr.setFromMatrixColumn(e,1).length(),o=1/mr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){let d=o*u,f=o*h,p=a*u,_=a*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=f+p*c,t[5]=d-_*c,t[9]=-a*l,t[2]=_-d*c,t[6]=p+f*c,t[10]=o*l}else if(e.order==="YXZ"){let d=l*u,f=l*h,p=c*u,_=c*h;t[0]=d+_*a,t[4]=p*a-f,t[8]=o*c,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=f*a-p,t[6]=_+d*a,t[10]=o*l}else if(e.order==="ZXY"){let d=l*u,f=l*h,p=c*u,_=c*h;t[0]=d-_*a,t[4]=-o*h,t[8]=p+f*a,t[1]=f+p*a,t[5]=o*u,t[9]=_-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){let d=o*u,f=o*h,p=a*u,_=a*h;t[0]=l*u,t[4]=p*c-f,t[8]=d*c+_,t[1]=l*h,t[5]=_*c+d,t[9]=f*c-p,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){let d=o*l,f=o*c,p=a*l,_=a*c;t[0]=l*u,t[4]=_-d*h,t[8]=p*h+f,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=f*h+p,t[10]=d-_*h}else if(e.order==="XZY"){let d=o*l,f=o*c,p=a*l,_=a*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=d*h+_,t[5]=o*u,t[9]=f*h-p,t[2]=p*h-f,t[6]=a*u,t[10]=_*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Qm,e,eg)}lookAt(e,t,n){let r=this.elements;return Jt.subVectors(e,t),Jt.lengthSq()===0&&(Jt.z=1),Jt.normalize(),pi.crossVectors(n,Jt),pi.lengthSq()===0&&(Math.abs(n.z)===1?Jt.x+=1e-4:Jt.z+=1e-4,Jt.normalize(),pi.crossVectors(n,Jt)),pi.normalize(),vo.crossVectors(Jt,pi),r[0]=pi.x,r[4]=vo.x,r[8]=Jt.x,r[1]=pi.y,r[5]=vo.y,r[9]=Jt.y,r[2]=pi.z,r[6]=vo.z,r[10]=Jt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],h=n[5],d=n[9],f=n[13],p=n[2],_=n[6],g=n[10],m=n[14],y=n[3],S=n[7],v=n[11],A=n[15],R=r[0],I=r[4],L=r[8],M=r[12],T=r[1],C=r[5],H=r[9],z=r[13],G=r[2],$=r[6],W=r[10],J=r[14],V=r[3],le=r[7],se=r[11],we=r[15];return s[0]=o*R+a*T+l*G+c*V,s[4]=o*I+a*C+l*$+c*le,s[8]=o*L+a*H+l*W+c*se,s[12]=o*M+a*z+l*J+c*we,s[1]=u*R+h*T+d*G+f*V,s[5]=u*I+h*C+d*$+f*le,s[9]=u*L+h*H+d*W+f*se,s[13]=u*M+h*z+d*J+f*we,s[2]=p*R+_*T+g*G+m*V,s[6]=p*I+_*C+g*$+m*le,s[10]=p*L+_*H+g*W+m*se,s[14]=p*M+_*z+g*J+m*we,s[3]=y*R+S*T+v*G+A*V,s[7]=y*I+S*C+v*$+A*le,s[11]=y*L+S*H+v*W+A*se,s[15]=y*M+S*z+v*J+A*we,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],h=e[6],d=e[10],f=e[14],p=e[3],_=e[7],g=e[11],m=e[15];return p*(+s*l*h-r*c*h-s*a*d+n*c*d+r*a*f-n*l*f)+_*(+t*l*f-t*c*d+s*o*d-r*o*f+r*c*u-s*l*u)+g*(+t*c*h-t*a*f-s*o*h+n*o*f+s*a*u-n*c*u)+m*(-r*a*u-t*l*h+t*a*d+r*o*h-n*o*d+n*l*u)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=e[9],d=e[10],f=e[11],p=e[12],_=e[13],g=e[14],m=e[15],y=h*g*c-_*d*c+_*l*f-a*g*f-h*l*m+a*d*m,S=p*d*c-u*g*c-p*l*f+o*g*f+u*l*m-o*d*m,v=u*_*c-p*h*c+p*a*f-o*_*f-u*a*m+o*h*m,A=p*h*l-u*_*l-p*a*d+o*_*d+u*a*g-o*h*g,R=t*y+n*S+r*v+s*A;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let I=1/R;return e[0]=y*I,e[1]=(_*d*s-h*g*s-_*r*f+n*g*f+h*r*m-n*d*m)*I,e[2]=(a*g*s-_*l*s+_*r*c-n*g*c-a*r*m+n*l*m)*I,e[3]=(h*l*s-a*d*s-h*r*c+n*d*c+a*r*f-n*l*f)*I,e[4]=S*I,e[5]=(u*g*s-p*d*s+p*r*f-t*g*f-u*r*m+t*d*m)*I,e[6]=(p*l*s-o*g*s-p*r*c+t*g*c+o*r*m-t*l*m)*I,e[7]=(o*d*s-u*l*s+u*r*c-t*d*c-o*r*f+t*l*f)*I,e[8]=v*I,e[9]=(p*h*s-u*_*s-p*n*f+t*_*f+u*n*m-t*h*m)*I,e[10]=(o*_*s-p*a*s+p*n*c-t*_*c-o*n*m+t*a*m)*I,e[11]=(u*a*s-o*h*s-u*n*c+t*h*c+o*n*f-t*a*f)*I,e[12]=A*I,e[13]=(u*_*r-p*h*r+p*n*d-t*_*d-u*n*g+t*h*g)*I,e[14]=(p*a*r-o*_*r-p*n*l+t*_*l+o*n*g-t*a*g)*I,e[15]=(o*h*r-u*a*r+u*n*l-t*h*l-o*n*d+t*a*d)*I,this}scale(e){let t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),s=1-n,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+n,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+n,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,o){return this.set(1,n,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,h=a+a,d=s*c,f=s*u,p=s*h,_=o*u,g=o*h,m=a*h,y=l*c,S=l*u,v=l*h,A=n.x,R=n.y,I=n.z;return r[0]=(1-(_+m))*A,r[1]=(f+v)*A,r[2]=(p-S)*A,r[3]=0,r[4]=(f-v)*R,r[5]=(1-(d+m))*R,r[6]=(g+y)*R,r[7]=0,r[8]=(p+S)*I,r[9]=(g-y)*I,r[10]=(1-(d+_))*I,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements,s=mr.set(r[0],r[1],r[2]).length(),o=mr.set(r[4],r[5],r[6]).length(),a=mr.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],yn.copy(this);let c=1/s,u=1/o,h=1/a;return yn.elements[0]*=c,yn.elements[1]*=c,yn.elements[2]*=c,yn.elements[4]*=u,yn.elements[5]*=u,yn.elements[6]*=u,yn.elements[8]*=h,yn.elements[9]*=h,yn.elements[10]*=h,t.setFromRotationMatrix(yn),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,r,s,o,a=Sn,l=!1){let c=this.elements,u=2*s/(t-e),h=2*s/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,_;if(l)p=s/(o-s),_=o*s/(o-s);else if(a===Sn)p=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===ys)p=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,s,o,a=Sn,l=!1){let c=this.elements,u=2/(t-e),h=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,_;if(l)p=1/(o-s),_=o/(o-s);else if(a===Sn)p=-2/(o-s),_=-(o+s)/(o-s);else if(a===ys)p=-1/(o-s),_=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=h,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},mr=new w,yn=new ve,Qm=new w(0,0,0),eg=new w(1,1,1),pi=new w,vo=new w,Jt=new w,gh=new ve,_h=new Q,gt=class i{constructor(e=0,t=0,n=0,r=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],h=r[2],d=r[6],f=r[10];switch(t){case"XYZ":this._y=Math.asin(qe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-qe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(qe(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-qe(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(qe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-qe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return gh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(gh,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return _h.setFromEuler(this),this.setFromQuaternion(_h,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};gt.DEFAULT_ORDER="XYZ";var Pr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},tg=0,xh=new w,gr=new Q,Wn=new ve,yo=new w,us=new w,ng=new w,ig=new Q,vh=new w(1,0,0),yh=new w(0,1,0),Mh=new w(0,0,1),Eh={type:"added"},rg={type:"removed"},_r={type:"childadded",child:null},Vl={type:"childremoved",child:null},Qe=class i extends Pn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:tg++}),this.uuid=Tn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new w,t=new gt,n=new Q,r=new w(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ve},normalMatrix:{value:new Ce}}),this.matrix=new ve,this.matrixWorld=new ve,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Pr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return gr.setFromAxisAngle(e,t),this.quaternion.multiply(gr),this}rotateOnWorldAxis(e,t){return gr.setFromAxisAngle(e,t),this.quaternion.premultiply(gr),this}rotateX(e){return this.rotateOnAxis(vh,e)}rotateY(e){return this.rotateOnAxis(yh,e)}rotateZ(e){return this.rotateOnAxis(Mh,e)}translateOnAxis(e,t){return xh.copy(e).applyQuaternion(this.quaternion),this.position.add(xh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(vh,e)}translateY(e){return this.translateOnAxis(yh,e)}translateZ(e){return this.translateOnAxis(Mh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Wn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?yo.copy(e):yo.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),us.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Wn.lookAt(us,yo,this.up):Wn.lookAt(yo,us,this.up),this.quaternion.setFromRotationMatrix(Wn),r&&(Wn.extractRotation(r.matrixWorld),gr.setFromRotationMatrix(Wn),this.quaternion.premultiply(gr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Eh),_r.child=e,this.dispatchEvent(_r),_r.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(rg),Vl.child=e,this.dispatchEvent(Vl),Vl.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Wn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Wn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Wn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Eh),_r.child=e,this.dispatchEvent(_r),_r.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(us,e,ng),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(us,ig,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];r.animations.push(s(e.animations,l))}}if(t){let a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),h=o(e.shapes),d=o(e.skeletons),f=o(e.animations),p=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=r,n;function o(a){let l=[];for(let c in a){let u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let r=e.children[n];this.add(r.clone())}return this}};Qe.DEFAULT_UP=new w(0,1,0);Qe.DEFAULT_MATRIX_AUTO_UPDATE=!0;Qe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Mn=new w,Xn=new w,zl=new w,qn=new w,xr=new w,vr=new w,Sh=new w,Gl=new w,Wl=new w,Xl=new w,ql=new Je,Yl=new Je,Zl=new Je,_i=class i{constructor(e=new w,t=new w,n=new w){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Mn.subVectors(e,t),r.cross(Mn);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){Mn.subVectors(r,t),Xn.subVectors(n,t),zl.subVectors(e,t);let o=Mn.dot(Mn),a=Mn.dot(Xn),l=Mn.dot(zl),c=Xn.dot(Xn),u=Xn.dot(zl),h=o*c-a*a;if(h===0)return s.set(0,0,0),null;let d=1/h,f=(c*l-a*u)*d,p=(o*u-a*l)*d;return s.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,qn)===null?!1:qn.x>=0&&qn.y>=0&&qn.x+qn.y<=1}static getInterpolation(e,t,n,r,s,o,a,l){return this.getBarycoord(e,t,n,r,qn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,qn.x),l.addScaledVector(o,qn.y),l.addScaledVector(a,qn.z),l)}static getInterpolatedAttribute(e,t,n,r,s,o){return ql.setScalar(0),Yl.setScalar(0),Zl.setScalar(0),ql.fromBufferAttribute(e,t),Yl.fromBufferAttribute(e,n),Zl.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(ql,s.x),o.addScaledVector(Yl,s.y),o.addScaledVector(Zl,s.z),o}static isFrontFacing(e,t,n,r){return Mn.subVectors(n,t),Xn.subVectors(e,t),Mn.cross(Xn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Mn.subVectors(this.c,this.b),Xn.subVectors(this.a,this.b),Mn.cross(Xn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return i.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,s=this.c,o,a;xr.subVectors(r,n),vr.subVectors(s,n),Gl.subVectors(e,n);let l=xr.dot(Gl),c=vr.dot(Gl);if(l<=0&&c<=0)return t.copy(n);Wl.subVectors(e,r);let u=xr.dot(Wl),h=vr.dot(Wl);if(u>=0&&h<=u)return t.copy(r);let d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(n).addScaledVector(xr,o);Xl.subVectors(e,s);let f=xr.dot(Xl),p=vr.dot(Xl);if(p>=0&&f<=p)return t.copy(s);let _=f*c-l*p;if(_<=0&&c>=0&&p<=0)return a=c/(c-p),t.copy(n).addScaledVector(vr,a);let g=u*p-f*h;if(g<=0&&h-u>=0&&f-p>=0)return Sh.subVectors(s,r),a=(h-u)/(h-u+(f-p)),t.copy(r).addScaledVector(Sh,a);let m=1/(g+_+d);return o=_*m,a=d*m,t.copy(n).addScaledVector(xr,o).addScaledVector(vr,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Hd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},mi={h:0,s:0,l:0},Mo={h:0,s:0,l:0};function $l(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var fe=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Tt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,je.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=je.workingColorSpace){return this.r=e,this.g=t,this.b=n,je.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=je.workingColorSpace){if(e=Lc(e,1),t=qe(t,0,1),n=qe(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=$l(o,s,e+1/3),this.g=$l(o,s,e),this.b=$l(o,s,e-1/3)}return je.colorSpaceToWorking(this,r),this}setStyle(e,t=Tt){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Tt){let n=Hd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Zn(e.r),this.g=Zn(e.g),this.b=Zn(e.b),this}copyLinearToSRGB(e){return this.r=br(e.r),this.g=br(e.g),this.b=br(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Tt){return je.workingToColorSpace(Ot.copy(this),e),Math.round(qe(Ot.r*255,0,255))*65536+Math.round(qe(Ot.g*255,0,255))*256+Math.round(qe(Ot.b*255,0,255))}getHexString(e=Tt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=je.workingColorSpace){je.workingToColorSpace(Ot.copy(this),t);let n=Ot.r,r=Ot.g,s=Ot.b,o=Math.max(n,r,s),a=Math.min(n,r,s),l,c,u=(a+o)/2;if(a===o)l=0,c=0;else{let h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case n:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-n)/h+2;break;case s:l=(n-r)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=je.workingColorSpace){return je.workingToColorSpace(Ot.copy(this),t),e.r=Ot.r,e.g=Ot.g,e.b=Ot.b,e}getStyle(e=Tt){je.workingToColorSpace(Ot.copy(this),e);let t=Ot.r,n=Ot.g,r=Ot.b;return e!==Tt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(mi),this.setHSL(mi.h+e,mi.s+t,mi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(mi),e.getHSL(Mo);let n=_s(mi.h,Mo.h,t),r=_s(mi.s,Mo.s,t),s=_s(mi.l,Mo.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ot=new fe;fe.NAMES=Hd;var sg=0,Ft=class extends Pn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:sg++}),this.uuid=Tn(),this.name="",this.type="Material",this.blending=Fi,this.side=en,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ko,this.blendDst=Ho,this.blendEquation=xi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new fe(0,0,0),this.blendAlpha=0,this.depthFunc=Bi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=oc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ui,this.stencilZFail=Ui,this.stencilZPass=Ui,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Fi&&(n.blending=this.blending),this.side!==en&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ko&&(n.blendSrc=this.blendSrc),this.blendDst!==Ho&&(n.blendDst=this.blendDst),this.blendEquation!==xi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Bi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==oc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ui&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ui&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ui&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){let o=[];for(let a in s){let l=s[a];delete l.metadata,o.push(l)}return o}if(t){let s=r(e.textures),o=r(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Bt=class extends Ft{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new fe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new gt,this.combine=vc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var bt=new w,Eo=new Ae,og=0,ke=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:og++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Vo,this.updateRanges=[],this.gpuType=fn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Eo.fromBufferAttribute(this,t),Eo.applyMatrix3(e),this.setXY(t,Eo.x,Eo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)bt.fromBufferAttribute(this,t),bt.applyMatrix3(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)bt.fromBufferAttribute(this,t),bt.applyMatrix4(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)bt.fromBufferAttribute(this,t),bt.applyNormalMatrix(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)bt.fromBufferAttribute(this,t),bt.transformDirection(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=En(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=at(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=En(t,this.array)),t}setX(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=En(t,this.array)),t}setY(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=En(t,this.array)),t}setZ(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=En(t,this.array)),t}setW(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),n=at(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),n=at(n,this.array),r=at(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),n=at(n,this.array),r=at(r,this.array),s=at(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Vo&&(e.usage=this.usage),e}};var Es=class extends ke{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Ss=class extends ke{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var zt=class extends ke{constructor(e,t,n){super(new Float32Array(e),t,n)}},ag=0,ln=new ve,jl=new Qe,yr=new w,Qt=new It,hs=new It,Ct=new w,nt=class i extends Pn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ag++}),this.uuid=Tn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Nc(e)?Ss:Es)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new Ce().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ln.makeRotationFromQuaternion(e),this.applyMatrix4(ln),this}rotateX(e){return ln.makeRotationX(e),this.applyMatrix4(ln),this}rotateY(e){return ln.makeRotationY(e),this.applyMatrix4(ln),this}rotateZ(e){return ln.makeRotationZ(e),this.applyMatrix4(ln),this}translate(e,t,n){return ln.makeTranslation(e,t,n),this.applyMatrix4(ln),this}scale(e,t,n){return ln.makeScale(e,t,n),this.applyMatrix4(ln),this}lookAt(e){return jl.lookAt(e),jl.updateMatrix(),this.applyMatrix4(jl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(yr).negate(),this.translate(yr.x,yr.y,yr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let r=0,s=e.length;r<s;r++){let o=e[r];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new zt(n,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new It);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new w(-1/0,-1/0,-1/0),new w(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){let s=t[n];Qt.setFromBufferAttribute(s),this.morphTargetsRelative?(Ct.addVectors(this.boundingBox.min,Qt.min),this.boundingBox.expandByPoint(Ct),Ct.addVectors(this.boundingBox.max,Qt.max),this.boundingBox.expandByPoint(Ct)):(this.boundingBox.expandByPoint(Qt.min),this.boundingBox.expandByPoint(Qt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Yt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new w,1/0);return}if(e){let n=this.boundingSphere.center;if(Qt.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){let a=t[s];hs.setFromBufferAttribute(a),this.morphTargetsRelative?(Ct.addVectors(Qt.min,hs.min),Qt.expandByPoint(Ct),Ct.addVectors(Qt.max,hs.max),Qt.expandByPoint(Ct)):(Qt.expandByPoint(hs.min),Qt.expandByPoint(hs.max))}Qt.getCenter(n);let r=0;for(let s=0,o=e.count;s<o;s++)Ct.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Ct));if(t)for(let s=0,o=t.length;s<o;s++){let a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Ct.fromBufferAttribute(a,c),l&&(yr.fromBufferAttribute(e,c),Ct.add(yr)),r=Math.max(r,n.distanceToSquared(Ct))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ke(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],l=[];for(let L=0;L<n.count;L++)a[L]=new w,l[L]=new w;let c=new w,u=new w,h=new w,d=new Ae,f=new Ae,p=new Ae,_=new w,g=new w;function m(L,M,T){c.fromBufferAttribute(n,L),u.fromBufferAttribute(n,M),h.fromBufferAttribute(n,T),d.fromBufferAttribute(s,L),f.fromBufferAttribute(s,M),p.fromBufferAttribute(s,T),u.sub(c),h.sub(c),f.sub(d),p.sub(d);let C=1/(f.x*p.y-p.x*f.y);isFinite(C)&&(_.copy(u).multiplyScalar(p.y).addScaledVector(h,-f.y).multiplyScalar(C),g.copy(h).multiplyScalar(f.x).addScaledVector(u,-p.x).multiplyScalar(C),a[L].add(_),a[M].add(_),a[T].add(_),l[L].add(g),l[M].add(g),l[T].add(g))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let L=0,M=y.length;L<M;++L){let T=y[L],C=T.start,H=T.count;for(let z=C,G=C+H;z<G;z+=3)m(e.getX(z+0),e.getX(z+1),e.getX(z+2))}let S=new w,v=new w,A=new w,R=new w;function I(L){A.fromBufferAttribute(r,L),R.copy(A);let M=a[L];S.copy(M),S.sub(A.multiplyScalar(A.dot(M))).normalize(),v.crossVectors(R,M);let C=v.dot(l[L])<0?-1:1;o.setXYZW(L,S.x,S.y,S.z,C)}for(let L=0,M=y.length;L<M;++L){let T=y[L],C=T.start,H=T.count;for(let z=C,G=C+H;z<G;z+=3)I(e.getX(z+0)),I(e.getX(z+1)),I(e.getX(z+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ke(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let r=new w,s=new w,o=new w,a=new w,l=new w,c=new w,u=new w,h=new w;if(e)for(let d=0,f=e.count;d<f;d+=3){let p=e.getX(d+0),_=e.getX(d+1),g=e.getX(d+2);r.fromBufferAttribute(t,p),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,g),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),a.fromBufferAttribute(n,p),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,g),a.add(u),l.add(u),c.add(u),n.setXYZ(p,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ct.fromBufferAttribute(e,t),Ct.normalize(),e.setXYZ(t,Ct.x,Ct.y,Ct.z)}toNonIndexed(){function e(a,l){let c=a.array,u=a.itemSize,h=a.normalized,d=new c.constructor(l.length*u),f=0,p=0;for(let _=0,g=l.length;_<g;_++){a.isInterleavedBufferAttribute?f=l[_]*a.data.stride+a.offset:f=l[_]*u;for(let m=0;m<u;m++)d[p++]=c[f++]}return new ke(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,r=this.attributes;for(let a in r){let l=r[a],c=e(l,n);t.setAttribute(a,c)}let s=this.morphAttributes;for(let a in s){let l=[],c=s[a];for(let u=0,h=c.length;u<h;u++){let d=c[u],f=e(d,n);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let r={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){let f=c[h];u.push(f.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let c in r){let u=r[c];this.setAttribute(c,u.clone(t))}let s=e.morphAttributes;for(let c in s){let u=[],h=s[c];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let c=0,u=o.length;c<u;c++){let h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Th=new ve,Li=new yi,So=new Yt,bh=new w,To=new w,bo=new w,wo=new w,Kl=new w,Ao=new w,wh=new w,Ro=new w,Et=class extends Qe{constructor(e=new nt,t=new Bt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let a=this.morphTargetInfluences;if(s&&a){Ao.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let u=a[l],h=s[l];u!==0&&(Kl.fromBufferAttribute(h,e),o?Ao.addScaledVector(Kl,u):Ao.addScaledVector(Kl.sub(t),u))}t.add(Ao)}return t}raycast(e,t){let n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),So.copy(n.boundingSphere),So.applyMatrix4(s),Li.copy(e.ray).recast(e.near),!(So.containsPoint(Li.origin)===!1&&(Li.intersectSphere(So,bh)===null||Li.origin.distanceToSquared(bh)>(e.far-e.near)**2))&&(Th.copy(s).invert(),Li.copy(e.ray).applyMatrix4(Th),!(n.boundingBox!==null&&Li.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Li)))}_computeIntersections(e,t,n){let r,s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,d=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,_=d.length;p<_;p++){let g=d[p],m=o[g.materialIndex],y=Math.max(g.start,f.start),S=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let v=y,A=S;v<A;v+=3){let R=a.getX(v),I=a.getX(v+1),L=a.getX(v+2);r=Co(this,m,e,n,c,u,h,R,I,L),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{let p=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let g=p,m=_;g<m;g+=3){let y=a.getX(g),S=a.getX(g+1),v=a.getX(g+2);r=Co(this,o,e,n,c,u,h,y,S,v),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let p=0,_=d.length;p<_;p++){let g=d[p],m=o[g.materialIndex],y=Math.max(g.start,f.start),S=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let v=y,A=S;v<A;v+=3){let R=v,I=v+1,L=v+2;r=Co(this,m,e,n,c,u,h,R,I,L),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{let p=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let g=p,m=_;g<m;g+=3){let y=g,S=g+1,v=g+2;r=Co(this,o,e,n,c,u,h,y,S,v),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}}};function lg(i,e,t,n,r,s,o,a){let l;if(e.side===Ut?l=n.intersectTriangle(o,s,r,!0,a):l=n.intersectTriangle(r,s,o,e.side===en,a),l===null)return null;Ro.copy(a),Ro.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(Ro);return c<t.near||c>t.far?null:{distance:c,point:Ro.clone(),object:i}}function Co(i,e,t,n,r,s,o,a,l,c){i.getVertexPosition(a,To),i.getVertexPosition(l,bo),i.getVertexPosition(c,wo);let u=lg(i,e,t,n,To,bo,wo,wh);if(u){let h=new w;_i.getBarycoord(wh,To,bo,wo,h),r&&(u.uv=_i.getInterpolatedAttribute(r,a,l,c,h,new Ae)),s&&(u.uv1=_i.getInterpolatedAttribute(s,a,l,c,h,new Ae)),o&&(u.normal=_i.getInterpolatedAttribute(o,a,l,c,h,new w),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let d={a,b:l,c,normal:new w,materialIndex:0};_i.getNormal(To,bo,wo,d.normal),u.face=d,u.barycoord=h}return u}var Ir=class i extends nt{constructor(e=1,t=1,n=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:o};let a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);let l=[],c=[],u=[],h=[],d=0,f=0;p("z","y","x",-1,-1,n,t,e,o,s,0),p("z","y","x",1,-1,n,t,-e,o,s,1),p("x","z","y",1,1,e,n,t,r,o,2),p("x","z","y",1,-1,e,n,-t,r,o,3),p("x","y","z",1,-1,e,t,n,r,s,4),p("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new zt(c,3)),this.setAttribute("normal",new zt(u,3)),this.setAttribute("uv",new zt(h,2));function p(_,g,m,y,S,v,A,R,I,L,M){let T=v/I,C=A/L,H=v/2,z=A/2,G=R/2,$=I+1,W=L+1,J=0,V=0,le=new w;for(let se=0;se<W;se++){let we=se*C-z;for(let ze=0;ze<$;ze++){let ht=ze*T-H;le[_]=ht*y,le[g]=we*S,le[m]=G,c.push(le.x,le.y,le.z),le[_]=0,le[g]=0,le[m]=R>0?1:-1,u.push(le.x,le.y,le.z),h.push(ze/I),h.push(1-se/L),J+=1}}for(let se=0;se<L;se++)for(let we=0;we<I;we++){let ze=d+we+$*se,ht=d+we+$*(se+1),rt=d+(we+1)+$*(se+1),q=d+(we+1)+$*se;l.push(ze,ht,q),l.push(ht,rt,q),V+=6}a.addGroup(f,V,M),f+=V,d+=J}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function $i(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function kt(i){let e={};for(let t=0;t<i.length;t++){let n=$i(i[t]);for(let r in n)e[r]=n[r]}return e}function cg(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Uc(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:je.workingColorSpace}var ja={clone:$i,merge:kt},ug=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,hg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,tn=class extends Ft{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ug,this.fragmentShader=hg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=$i(e.uniforms),this.uniformsGroups=cg(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},Ts=class extends Qe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ve,this.projectionMatrix=new ve,this.projectionMatrixInverse=new ve,this.coordinateSystem=Sn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},gi=new w,Ah=new Ae,Rh=new Ae,wt=class extends Ts{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Vi*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(gs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Vi*2*Math.atan(Math.tan(gs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){gi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(gi.x,gi.y).multiplyScalar(-e/gi.z),gi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(gi.x,gi.y).multiplyScalar(-e/gi.z)}getViewSize(e,t){return this.getViewBounds(e,Ah,Rh),t.subVectors(Rh,Ah)}setViewOffset(e,t,n,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(gs*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,t-=o.offsetY*n/c,r*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Mr=-90,Er=1,Xo=class extends Qe{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new wt(Mr,Er,e,t);r.layers=this.layers,this.add(r);let s=new wt(Mr,Er,e,t);s.layers=this.layers,this.add(s);let o=new wt(Mr,Er,e,t);o.layers=this.layers,this.add(o);let a=new wt(Mr,Er,e,t);a.layers=this.layers,this.add(a);let l=new wt(Mr,Er,e,t);l.layers=this.layers,this.add(l);let c=new wt(Mr,Er,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,s,o,a,l]=t;for(let c of t)this.remove(c);if(e===Sn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ys)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,o,a,l,c,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,s),e.setRenderTarget(n,1,r),e.render(t,o),e.setRenderTarget(n,2,r),e.render(t,a),e.setRenderTarget(n,3,r),e.render(t,l),e.setRenderTarget(n,4,r),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,r),e.render(t,u),e.setRenderTarget(h,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},bs=class extends Pt{constructor(e=[],t=qi,n,r,s,o,a,l,c,u){super(e,t,n,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},qo=class extends In{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new bs(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Ir(5,5,5),s=new tn({name:"CubemapFromEquirect",uniforms:$i(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ut,blending:oi});s.uniforms.tEquirect.value=t;let o=new Et(r,s),a=t.minFilter;return t.minFilter===wn&&(t.minFilter=Gt),new Xo(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,r);e.setRenderTarget(s)}},mt=class extends Qe{constructor(){super(),this.isGroup=!0,this.type="Group"}},dg={type:"move"},Lr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new mt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new mt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new w,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new w),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new mt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new w,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new w),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(let _ of e.hand.values()){let g=t.getJointPose(_,n),m=this._getHandJoint(c,_);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}let u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,p=.005;c.inputState.pinching&&d>f+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(dg)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new mt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}};var Nr=class extends Qe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new gt,this.environmentIntensity=1,this.environmentRotation=new gt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},$n=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Vo,this.updateRanges=[],this.version=0,this.uuid=Tn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Tn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Tn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Vt=new w,jn=class i{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Vt.fromBufferAttribute(this,t),Vt.applyMatrix4(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Vt.fromBufferAttribute(this,t),Vt.applyNormalMatrix(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Vt.fromBufferAttribute(this,t),Vt.transformDirection(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=En(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=at(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=En(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=En(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=En(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=En(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),n=at(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),n=at(n,this.array),r=at(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),n=at(n,this.array),r=at(r,this.array),s=at(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new ke(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}};var Ch=new w,Ph=new Je,Ih=new Je,fg=new w,Lh=new ve,Po=new w,Jl=new Yt,Nh=new ve,Ql=new yi,Kn=class extends Et{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=sc,this.bindMatrix=new ve,this.bindMatrixInverse=new ve,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new It),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Po),this.boundingBox.expandByPoint(Po)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Yt),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Po),this.boundingSphere.expandByPoint(Po)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,r=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Jl.copy(this.boundingSphere),Jl.applyMatrix4(r),e.ray.intersectsSphere(Jl)!==!1&&(Nh.copy(r).invert(),Ql.copy(e.ray).applyMatrix4(Nh),!(this.boundingBox!==null&&Ql.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Ql)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new Je,t=this.geometry.attributes.skinWeight;for(let n=0,r=t.count;n<r;n++){e.fromBufferAttribute(t,n);let s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===sc?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===bd?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,r=this.geometry;Ph.fromBufferAttribute(r.attributes.skinIndex,e),Ih.fromBufferAttribute(r.attributes.skinWeight,e),Ch.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){let o=Ih.getComponent(s);if(o!==0){let a=Ph.getComponent(s);Lh.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(fg.copy(Ch).applyMatrix4(Lh),o)}}return t.applyMatrix4(this.bindMatrixInverse)}},Ur=class extends Qe{constructor(){super(),this.isBone=!0,this.type="Bone"}},ws=class extends Pt{constructor(e=null,t=1,n=1,r,s,o,a,l,c=Lt,u=Lt,h,d){super(null,o,a,l,c,u,r,s,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Uh=new ve,pg=new ve,nn=class i{constructor(e=[],t=[]){this.uuid=Tn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,r=this.bones.length;n<r;n++)this.boneInverses.push(new ve)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new ve;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,r=this.boneTexture;for(let s=0,o=e.length;s<o;s++){let a=e[s]?e[s].matrixWorld:pg;Uh.multiplyMatrices(a,t[s]),Uh.toArray(n,s*16)}r!==null&&(r.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new ws(t,e,e,rn,fn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let r=this.bones[t];if(r.name===e)return r}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,r=e.bones.length;n<r;n++){let s=e.bones[n],o=t[s];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),o=new Ur),this.bones.push(o),this.boneInverses.push(new ve().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let r=0,s=t.length;r<s;r++){let o=t[r];e.bones.push(o.uuid);let a=n[r];e.boneInverses.push(a.toArray())}return e}},Mi=class extends ke{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Sr=new ve,Dh=new ve,Io=[],Oh=new It,mg=new ve,ds=new Et,fs=new Yt,As=class extends Et{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Mi(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,mg)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new It),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Sr),Oh.copy(e.boundingBox).applyMatrix4(Sr),this.boundingBox.union(Oh)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Yt),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Sr),fs.copy(e.boundingSphere).applyMatrix4(Sr),this.boundingSphere.union(fs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=n.length+1,o=e*s+1;for(let a=0;a<n.length;a++)n[a]=r[o+a]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(ds.geometry=this.geometry,ds.material=this.material,ds.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),fs.copy(this.boundingSphere),fs.applyMatrix4(n),e.ray.intersectsSphere(fs)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Sr),Dh.multiplyMatrices(n,Sr),ds.matrixWorld=Dh,ds.raycast(e,Io);for(let o=0,a=Io.length;o<a;o++){let l=Io[o];l.instanceId=s,l.object=this,t.push(l)}Io.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Mi(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new ws(new Float32Array(r*this.count),r,this.count,_a,fn));let s=this.morphTexture.source.data.data,o=0;for(let c=0;c<n.length;c++)o+=n[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=r*e;s[l]=a,s.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},ec=new w,gg=new w,_g=new Ce,Rn=class{constructor(e=new w(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=ec.subVectors(n,t).cross(gg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(ec),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||_g.getNormalMatrix(e),r=this.coplanarPoint(ec).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Ni=new Yt,xg=new Ae(.5,.5),Lo=new w,Dr=class{constructor(e=new Rn,t=new Rn,n=new Rn,r=new Rn,s=new Rn,o=new Rn){this.planes=[e,t,n,r,s,o]}set(e,t,n,r,s,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Sn,n=!1){let r=this.planes,s=e.elements,o=s[0],a=s[1],l=s[2],c=s[3],u=s[4],h=s[5],d=s[6],f=s[7],p=s[8],_=s[9],g=s[10],m=s[11],y=s[12],S=s[13],v=s[14],A=s[15];if(r[0].setComponents(c-o,f-u,m-p,A-y).normalize(),r[1].setComponents(c+o,f+u,m+p,A+y).normalize(),r[2].setComponents(c+a,f+h,m+_,A+S).normalize(),r[3].setComponents(c-a,f-h,m-_,A-S).normalize(),n)r[4].setComponents(l,d,g,v).normalize(),r[5].setComponents(c-l,f-d,m-g,A-v).normalize();else if(r[4].setComponents(c-l,f-d,m-g,A-v).normalize(),t===Sn)r[5].setComponents(c+l,f+d,m+g,A+v).normalize();else if(t===ys)r[5].setComponents(l,d,g,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ni.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ni.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ni)}intersectsSprite(e){Ni.center.set(0,0,0);let t=xg.distanceTo(e.center);return Ni.radius=.7071067811865476+t,Ni.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ni)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Lo.x=r.normal.x>0?e.max.x:e.min.x,Lo.y=r.normal.y>0?e.max.y:e.min.y,Lo.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Lo)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Wt=class extends Ft{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new fe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Yo=new w,Zo=new w,Fh=new ve,ps=new yi,No=new Yt,tc=new w,Bh=new w,Jn=class extends Qe{constructor(e=new nt,t=new Wt){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)Yo.fromBufferAttribute(t,r-1),Zo.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=Yo.distanceTo(Zo);e.setAttribute("lineDistance",new zt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),No.copy(n.boundingSphere),No.applyMatrix4(r),No.radius+=s,e.ray.intersectsSphere(No)===!1)return;Fh.copy(r).invert(),ps.copy(e.ray).applyMatrix4(Fh);let a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=n.index,d=n.attributes.position;if(u!==null){let f=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let _=f,g=p-1;_<g;_+=c){let m=u.getX(_),y=u.getX(_+1),S=Uo(this,e,ps,l,m,y,_);S&&t.push(S)}if(this.isLineLoop){let _=u.getX(p-1),g=u.getX(f),m=Uo(this,e,ps,l,_,g,p-1);m&&t.push(m)}}else{let f=Math.max(0,o.start),p=Math.min(d.count,o.start+o.count);for(let _=f,g=p-1;_<g;_+=c){let m=Uo(this,e,ps,l,_,_+1,_);m&&t.push(m)}if(this.isLineLoop){let _=Uo(this,e,ps,l,p-1,f,p-1);_&&t.push(_)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}};function Uo(i,e,t,n,r,s,o){let a=i.geometry.attributes.position;if(Yo.fromBufferAttribute(a,r),Zo.fromBufferAttribute(a,s),t.distanceSqToSegment(Yo,Zo,tc,Bh)>n)return;tc.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(tc);if(!(c<e.near||c>e.far))return{distance:c,point:Bh.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}var kh=new w,Hh=new w,un=class extends Jn{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)kh.fromBufferAttribute(t,r),Hh.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+kh.distanceTo(Hh);e.setAttribute("lineDistance",new zt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Rs=class extends Jn{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},Or=class extends Ft{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new fe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Vh=new ve,ac=new yi,Do=new Yt,Oo=new w,Cs=class extends Qe{constructor(e=new nt,t=new Or){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Do.copy(n.boundingSphere),Do.applyMatrix4(r),Do.radius+=s,e.ray.intersectsSphere(Do)===!1)return;Vh.copy(r).invert(),ac.copy(e.ray).applyMatrix4(Vh);let a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,h=n.attributes.position;if(c!==null){let d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let p=d,_=f;p<_;p++){let g=c.getX(p);Oo.fromBufferAttribute(h,g),zh(Oo,g,l,r,e,t,this)}}else{let d=Math.max(0,o.start),f=Math.min(h.count,o.start+o.count);for(let p=d,_=f;p<_;p++)Oo.fromBufferAttribute(h,p),zh(Oo,p,l,r,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}};function zh(i,e,t,n,r,s,o){let a=ac.distanceSqToPoint(i);if(a<t){let l=new w;ac.closestPointToPoint(i,l),l.applyMatrix4(n);let c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var Ps=class extends Pt{constructor(e,t,n=Si,r,s,o,a=Lt,l=Lt,c,u=Ar,h=1){if(u!==Ar&&u!==Gr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:e,height:t,depth:h};super(d,r,s,o,a,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Cr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}};var Gi=class i extends nt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let s=e/2,o=t/2,a=Math.floor(n),l=Math.floor(r),c=a+1,u=l+1,h=e/a,d=t/l,f=[],p=[],_=[],g=[];for(let m=0;m<u;m++){let y=m*d-o;for(let S=0;S<c;S++){let v=S*h-s;p.push(v,-y,0),_.push(0,0,1),g.push(S/a),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let y=0;y<a;y++){let S=y+c*m,v=y+c*(m+1),A=y+1+c*(m+1),R=y+1+c*m;f.push(S,v,R),f.push(v,A,R)}this.setIndex(f),this.setAttribute("position",new zt(p,3)),this.setAttribute("normal",new zt(_,3)),this.setAttribute("uv",new zt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var Wi=class extends Ft{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new fe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new fe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=js,this.normalScale=new Ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new gt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Zt=class extends Wi{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ae(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return qe(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new fe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new fe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new fe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var $o=class extends Ft{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Rd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},jo=class extends Ft{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Fo(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function vg(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function yg(i){function e(r,s){return i[r]-i[s]}let t=i.length,n=new Array(t);for(let r=0;r!==t;++r)n[r]=r;return n.sort(e),n}function Gh(i,e,t){let n=i.length,r=new i.constructor(n);for(let s=0,o=0;o!==n;++s){let a=t[s]*e;for(let l=0;l!==e;++l)r[o++]=i[a+l]}return r}function Vd(i,e,t,n){let r=1,s=i[0];for(;s!==void 0&&s[n]===void 0;)s=i[r++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(e.push(s.time),t.push(...o)),s=i[r++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(e.push(s.time),o.toArray(t,t.length)),s=i[r++];while(s!==void 0);else do o=s[n],o!==void 0&&(e.push(s.time),t.push(o)),s=i[r++];while(s!==void 0)}var Qn=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],s=t[n-1];e:{t:{let o;n:{i:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=r,r=t[++n],e<r)break t}o=t.length;break n}if(!(e>=s)){let a=t[1];e<a&&(n=2,s=a);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(r=s,s=t[--n-1],e>=s)break t}o=n,n=0;break n}break e}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(r=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,r)}return this.interpolate_(n,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r;for(let o=0;o!==r;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Ko=class extends Qn{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Di,endingEnd:Di}}intervalChanged_(e,t,n){let r=this.parameterPositions,s=e-2,o=e+1,a=r[s],l=r[o];if(a===void 0)switch(this.getSettings_().endingStart){case Oi:s=e,a=2*t-n;break;case xs:s=r.length-2,a=t+r[s]-r[s+1];break;default:s=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Oi:o=e,l=2*n-t;break;case xs:o=1,l=n+r[1]-r[0];break;default:o=e-1,l=t}let c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=s*u,this._offsetNext=o*u}interpolate_(e,t,n,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),_=p*p,g=_*p,m=-d*g+2*d*_-d*p,y=(1+d)*g+(-1.5-2*d)*_+(-.5+d)*p+1,S=(-1-f)*g+(1.5+f)*_+.5*p,v=f*g-f*_;for(let A=0;A!==a;++A)s[A]=m*o[u+A]+y*o[c+A]+S*o[l+A]+v*o[h+A];return s}},Is=class extends Qn{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=(n-t)/(r-t),h=1-u;for(let d=0;d!==a;++d)s[d]=o[c+d]*h+o[l+d]*u;return s}},Jo=class extends Qn{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},$t=class{constructor(e,t,n,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Fo(t,this.TimeBufferType),this.values=Fo(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Fo(e.times,Array),values:Fo(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(n.interpolation=r)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Jo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Is(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Ko(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case ki:t=this.InterpolantFactoryMethodDiscrete;break;case Hi:t=this.InterpolantFactoryMethodLinear;break;case Bo:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ki;case this.InterpolantFactoryMethodLinear:return Hi;case this.InterpolantFactoryMethodSmooth:return Bo}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){let n=this.times,r=n.length,s=0,o=r-1;for(;s!==r&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==r){s>=o&&(o=Math.max(o,1),s=o-1);let a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,r=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(r!==void 0&&vg(r))for(let a=0,l=r.length;a!==l;++a){let c=r[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Bo,s=e.length-1,o=1;for(let a=1;a<s;++a){let l=!1,c=e[a],u=e[a+1];if(c!==u&&(a!==1||c!==e[0]))if(r)l=!0;else{let h=a*n,d=h-n,f=h+n;for(let p=0;p!==n;++p){let _=t[h+p];if(_!==t[d+p]||_!==t[f+p]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];let h=a*n,d=o*n;for(let f=0;f!==n;++f)t[d+f]=t[h+f]}++o}}if(s>0){e[o]=e[s];for(let a=s*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};$t.prototype.ValueTypeName="";$t.prototype.TimeBufferType=Float32Array;$t.prototype.ValueBufferType=Float32Array;$t.prototype.DefaultInterpolation=Hi;var ei=class extends $t{constructor(e,t,n){super(e,t,n)}};ei.prototype.ValueTypeName="bool";ei.prototype.ValueBufferType=Array;ei.prototype.DefaultInterpolation=ki;ei.prototype.InterpolantFactoryMethodLinear=void 0;ei.prototype.InterpolantFactoryMethodSmooth=void 0;var Ls=class extends $t{constructor(e,t,n,r){super(e,t,n,r)}};Ls.prototype.ValueTypeName="color";var hn=class extends $t{constructor(e,t,n,r){super(e,t,n,r)}};hn.prototype.ValueTypeName="number";var Qo=class extends Qn{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(r-t),c=e*a;for(let u=c+a;c!==u;c+=4)Q.slerpFlat(s,0,o,c-a,o,c,l);return s}},dn=class extends $t{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new Qo(this.times,this.values,this.getValueSize(),e)}};dn.prototype.ValueTypeName="quaternion";dn.prototype.InterpolantFactoryMethodSmooth=void 0;var ti=class extends $t{constructor(e,t,n){super(e,t,n)}};ti.prototype.ValueTypeName="string";ti.prototype.ValueBufferType=Array;ti.prototype.DefaultInterpolation=ki;ti.prototype.InterpolantFactoryMethodLinear=void 0;ti.prototype.InterpolantFactoryMethodSmooth=void 0;var Ln=class extends $t{constructor(e,t,n,r){super(e,t,n,r)}};Ln.prototype.ValueTypeName="vector";var ni=class{constructor(e="",t=-1,n=[],r=$a){this.name=e,this.tracks=n,this.duration=t,this.blendMode=r,this.uuid=Tn(),this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,r=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(Eg(n[o]).scale(r));let s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){let t=[],n=e.tracks,r={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,o=n.length;s!==o;++s)t.push($t.toJSON(n[s]));return r}static CreateFromMorphTargetSequence(e,t,n,r){let s=t.length,o=[];for(let a=0;a<s;a++){let l=[],c=[];l.push((a+s-1)%s,a,(a+1)%s),c.push(0,1,0);let u=yg(l);l=Gh(l,1,u),c=Gh(c,1,u),!r&&l[0]===0&&(l.push(s),c.push(c[0])),o.push(new hn(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let r=e;n=r.geometry&&r.geometry.animations||r.animations}for(let r=0;r<n.length;r++)if(n[r].name===t)return n[r];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let r={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){let c=e[a],u=c.name.match(s);if(u&&u.length>1){let h=u[1],d=r[h];d||(r[h]=d=[]),d.push(c)}}let o=[];for(let a in r)o.push(this.CreateFromMorphTargetSequence(a,r[a],t,n));return o}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(h,d,f,p,_){if(f.length!==0){let g=[],m=[];Vd(f,g,m,p),g.length!==0&&_.push(new h(d,g,m))}},r=[],s=e.name||"default",o=e.fps||30,a=e.blendMode,l=e.length||-1,c=e.hierarchy||[];for(let h=0;h<c.length;h++){let d=c[h].keys;if(!(!d||d.length===0))if(d[0].morphTargets){let f={},p;for(p=0;p<d.length;p++)if(d[p].morphTargets)for(let _=0;_<d[p].morphTargets.length;_++)f[d[p].morphTargets[_]]=-1;for(let _ in f){let g=[],m=[];for(let y=0;y!==d[p].morphTargets.length;++y){let S=d[p];g.push(S.time),m.push(S.morphTarget===_?1:0)}r.push(new hn(".morphTargetInfluence["+_+"]",g,m))}l=f.length*o}else{let f=".bones["+t[h].name+"]";n(Ln,f+".position",d,"pos",r),n(dn,f+".quaternion",d,"rot",r),n(Ln,f+".scale",d,"scl",r)}}return r.length===0?null:new this(s,l,r,a)}resetDuration(){let e=this.tracks,t=0;for(let n=0,r=e.length;n!==r;++n){let s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}};function Mg(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return hn;case"vector":case"vector2":case"vector3":case"vector4":return Ln;case"color":return Ls;case"quaternion":return dn;case"bool":case"boolean":return ei;case"string":return ti}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function Eg(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=Mg(i.type);if(i.times===void 0){let t=[],n=[];Vd(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}var cn={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}},ea=class{constructor(e,t,n){let r=this,s=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(u){a++,s===!1&&r.onStart!==void 0&&r.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,r.onProgress!==void 0&&r.onProgress(u,o,a),o===a&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){let h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=c.length;h<d;h+=2){let f=c[h],p=c[h+1];if(f.global&&(f.lastIndex=0),f.test(u))return p}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},zd=new ea,Nn=class{constructor(e){this.manager=e!==void 0?e:zd,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Nn.DEFAULT_MATERIAL_NAME="__DEFAULT";var Yn={},lc=class extends Error{constructor(e,t){super(e),this.response=t}},Fr=class extends Nn{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=cn.get(`file:${e}`);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(Yn[e]!==void 0){Yn[e].push({onLoad:t,onProgress:n,onError:r});return}Yn[e]=[],Yn[e].push({onLoad:t,onProgress:n,onError:r});let o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let u=Yn[e],h=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,p=f!==0,_=0,g=new ReadableStream({start(m){y();function y(){h.read().then(({done:S,value:v})=>{if(S)m.close();else{_+=v.byteLength;let A=new ProgressEvent("progress",{lengthComputable:p,loaded:_,total:f});for(let R=0,I=u.length;R<I;R++){let L=u[R];L.onProgress&&L.onProgress(A)}m.enqueue(v),y()}},S=>{m.error(S)})}}});return new Response(g)}else throw new lc(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return c.json();default:if(a==="")return c.text();{let h=/charset="?([^;"\s]*)"?/i.exec(a),d=h&&h[1]?h[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(p=>f.decode(p))}}}).then(c=>{cn.add(`file:${e}`,c);let u=Yn[e];delete Yn[e];for(let h=0,d=u.length;h<d;h++){let f=u[h];f.onLoad&&f.onLoad(c)}}).catch(c=>{let u=Yn[e];if(u===void 0)throw this.manager.itemError(e),c;delete Yn[e];for(let h=0,d=u.length;h<d;h++){let f=u[h];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Tr=new WeakMap,Br=class extends Nn{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,o=cn.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0);else{let h=Tr.get(o);h===void 0&&(h=[],Tr.set(o,h)),h.push({onLoad:t,onError:r})}return o}let a=Rr("img");function l(){u(),t&&t(this);let h=Tr.get(this)||[];for(let d=0;d<h.length;d++){let f=h[d];f.onLoad&&f.onLoad(this)}Tr.delete(this),s.manager.itemEnd(e)}function c(h){u(),r&&r(h),cn.remove(`image:${e}`);let d=Tr.get(this)||[];for(let f=0;f<d.length;f++){let p=d[f];p.onError&&p.onError(h)}Tr.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),cn.add(`image:${e}`,a),s.manager.itemStart(e),a.src=e,a}};var Ns=class extends Nn{constructor(e){super(e)}load(e,t,n,r){let s=new Pt,o=new Br(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},n,r),s}},Xi=class extends Qe{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new fe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}};var nc=new ve,Wh=new w,Xh=new w,Us=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ae(512,512),this.mapType=An,this.map=null,this.mapPass=null,this.matrix=new ve,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Dr,this._frameExtents=new Ae(1,1),this._viewportCount=1,this._viewports=[new Je(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Wh.setFromMatrixPosition(e.matrixWorld),t.position.copy(Wh),Xh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Xh),t.updateMatrixWorld(),nc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(nc,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(nc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},cc=class extends Us{constructor(){super(new wt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=Vi*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(n!==t.fov||r!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=r,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},Ds=class extends Xi{constructor(e,t,n=0,r=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Qe.DEFAULT_UP),this.updateMatrix(),this.target=new Qe,this.distance=n,this.angle=r,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new cc}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},qh=new ve,ms=new w,ic=new w,uc=class extends Us{constructor(){super(new wt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ae(4,2),this._viewportCount=6,this._viewports=[new Je(2,1,1,1),new Je(0,1,1,1),new Je(3,1,1,1),new Je(1,1,1,1),new Je(3,0,1,1),new Je(1,0,1,1)],this._cubeDirections=[new w(1,0,0),new w(-1,0,0),new w(0,0,1),new w(0,0,-1),new w(0,1,0),new w(0,-1,0)],this._cubeUps=[new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,0,1),new w(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,r=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),ms.setFromMatrixPosition(e.matrixWorld),n.position.copy(ms),ic.copy(n.position),ic.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(ic),n.updateMatrixWorld(),r.makeTranslation(-ms.x,-ms.y,-ms.z),qh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(qh,n.coordinateSystem,n.reversedDepth)}},Os=class extends Xi{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new uc}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},ii=class extends Ts{constructor(e=-1,t=1,n=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=n-e,o=n+e,a=r+t,l=r-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},hc=class extends Us{constructor(){super(new ii(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ei=class extends Xi{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Qe.DEFAULT_UP),this.updateMatrix(),this.target=new Qe,this.shadow=new hc}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},Fs=class extends Xi{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}};var ri=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var rc=new WeakMap,Bs=class extends Nn{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,o=cn.get(`image-bitmap:${e}`);if(o!==void 0){if(s.manager.itemStart(e),o.then){o.then(c=>{if(rc.has(o)===!0)r&&r(rc.get(o)),s.manager.itemError(e),s.manager.itemEnd(e);else return t&&t(c),s.manager.itemEnd(e),c});return}return setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o}let a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){return cn.add(`image-bitmap:${e}`,c),t&&t(c),s.manager.itemEnd(e),c}).catch(function(c){r&&r(c),rc.set(l,c),cn.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});cn.add(`image-bitmap:${e}`,l),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var ta=class extends wt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},ks=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}};var na=class{constructor(e,t,n){this.binding=e,this.valueSize=n;let r,s,o;switch(t){case"quaternion":r=this._slerp,s=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":r=this._select,s=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:r=this._lerp,s=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=r,this._mixBufferRegionAdditive=s,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let n=this.buffer,r=this.valueSize,s=e*r+r,o=this.cumulativeWeight;if(o===0){for(let a=0;a!==r;++a)n[s+a]=n[a];o=t}else{o+=t;let a=t/o;this._mixBufferRegion(n,s,0,a,r)}this.cumulativeWeight=o}accumulateAdditive(e){let t=this.buffer,n=this.valueSize,r=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,r,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,n=this.buffer,r=e*t+t,s=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){let l=t*this._origIndex;this._mixBufferRegion(n,r,l,1-s,t)}o>0&&this._mixBufferRegionAdditive(n,r,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){a.setValue(n,r);break}}saveOriginalState(){let e=this.binding,t=this.buffer,n=this.valueSize,r=n*this._origIndex;e.getValue(t,r);for(let s=n,o=r;s!==o;++s)t[s]=t[r+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,r,s){if(r>=.5)for(let o=0;o!==s;++o)e[t+o]=e[n+o]}_slerp(e,t,n,r){Q.slerpFlat(e,t,e,t,e,n,r)}_slerpAdditive(e,t,n,r,s){let o=this._workIndex*s;Q.multiplyQuaternionsFlat(e,o,e,t,e,n),Q.slerpFlat(e,t,e,t,e,o,r)}_lerp(e,t,n,r,s){let o=1-r;for(let a=0;a!==s;++a){let l=t+a;e[l]=e[l]*o+e[n+a]*r}}_lerpAdditive(e,t,n,r,s){for(let o=0;o!==s;++o){let a=t+o;e[a]=e[a]+e[n+o]*r}}},Dc="\\[\\]\\.:\\/",Sg=new RegExp("["+Dc+"]","g"),Oc="[^"+Dc+"]",Tg="[^"+Dc.replace("\\.","")+"]",bg=/((?:WC+[\/:])*)/.source.replace("WC",Oc),wg=/(WCOD+)?/.source.replace("WCOD",Tg),Ag=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Oc),Rg=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Oc),Cg=new RegExp("^"+bg+wg+Ag+Rg+"$"),Pg=["material","materials","bones","map"],dc=class{constructor(e,t,n){let r=n||ut.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=n.length;r!==s;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},ut=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Sg,"")}static parseTrackName(e){let t=Cg.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=n.nodeName.substring(r+1);Pg.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let o=0;o<s.length;o++){let a=s[o];if(a.name===t||a.uuid===t)return a;let l=n(a.children);if(l)return l}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,r=t.propertyName,s=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let o=e[r];if(o===void 0){let c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+r+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=r;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ut.Composite=dc;ut.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ut.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ut.prototype.GetterByBindingType=[ut.prototype._getValue_direct,ut.prototype._getValue_array,ut.prototype._getValue_arrayElement,ut.prototype._getValue_toArray];ut.prototype.SetterByBindingTypeAndVersioning=[[ut.prototype._setValue_direct,ut.prototype._setValue_direct_setNeedsUpdate,ut.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ut.prototype._setValue_array,ut.prototype._setValue_array_setNeedsUpdate,ut.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ut.prototype._setValue_arrayElement,ut.prototype._setValue_arrayElement_setNeedsUpdate,ut.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ut.prototype._setValue_fromArray,ut.prototype._setValue_fromArray_setNeedsUpdate,ut.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var ia=class{constructor(e,t,n=null,r=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=r;let s=t.tracks,o=s.length,a=new Array(o),l={endingStart:Di,endingEnd:Di};for(let c=0;c!==o;++c){let u=s[c].createInterpolant(null);a[c]=u,u.settings=l}this._interpolantSettings=l,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Za,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){let r=this._clip.duration,s=e._clip.duration,o=s/r,a=r/s;e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){let r=this._mixer,s=r.time,o=this.timeScale,a=this._timeScaleInterpolant;a===null&&(a=r._lendControlInterpolant(),this._timeScaleInterpolant=a);let l=a.parameterPositions,c=a.sampleValues;return l[0]=s,l[1]=s+n,c[0]=e/o,c[1]=t/o,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,r){if(!this.enabled){this._updateWeight(e);return}let s=this._startTime;if(s!==null){let l=(e-s)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);let o=this._updateTime(t),a=this._updateWeight(e);if(a>0){let l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case Ad:for(let u=0,h=l.length;u!==h;++u)l[u].evaluate(o),c[u].accumulateAdditive(a);break;case $a:default:for(let u=0,h=l.length;u!==h;++u)l[u].evaluate(o),c[u].accumulate(r,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let n=this._weightInterpolant;if(n!==null){let r=n.evaluate(e)[0];t*=r,e>n.parameterPositions[1]&&(this.stopFading(),r===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let r=n.evaluate(e)[0];t*=r,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,n=this.loop,r=this.time+e,s=this._loopCount,o=n===wd;if(e===0)return s===-1?r:o&&(s&1)===1?t-r:r;if(n===Ya){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(r>=t)r=t;else if(r<0)r=0;else{this.time=r;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=r,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(s===-1&&(e>=0?(s=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),r>=t||r<0){let a=Math.floor(r/t);r-=t*a,s+=Math.abs(a);let l=this.repetitions-s;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,r=e>0?t:0,this.time=r,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){let c=e<0;this._setEndings(c,!c,o)}else this._setEndings(!1,!1,o);this._loopCount=s,this.time=r,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=r;if(o&&(s&1)===1)return t-r}return r}_setEndings(e,t,n){let r=this._interpolantSettings;n?(r.endingStart=Oi,r.endingEnd=Oi):(e?r.endingStart=this.zeroSlopeAtStart?Oi:Di:r.endingStart=xs,t?r.endingEnd=this.zeroSlopeAtEnd?Oi:Di:r.endingEnd=xs)}_scheduleFading(e,t,n){let r=this._mixer,s=r.time,o=this._weightInterpolant;o===null&&(o=r._lendControlInterpolant(),this._weightInterpolant=o);let a=o.parameterPositions,l=o.sampleValues;return a[0]=s,l[0]=t,a[1]=s+e,l[1]=n,this}},Ig=new Float32Array(1),Hs=class extends Pn{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){let n=e._localRoot||this._root,r=e._clip.tracks,s=r.length,o=e._propertyBindings,a=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName,u=c[l];u===void 0&&(u={},c[l]=u);for(let h=0;h!==s;++h){let d=r[h],f=d.name,p=u[f];if(p!==void 0)++p.referenceCount,o[h]=p;else{if(p=o[h],p!==void 0){p._cacheIndex===null&&(++p.referenceCount,this._addInactiveBinding(p,l,f));continue}let _=t&&t._propertyBindings[h].binding.parsedPath;p=new na(ut.create(n,f,_),d.ValueTypeName,d.getValueSize()),++p.referenceCount,this._addInactiveBinding(p,l,f),o[h]=p}a[h].resultBuffer=p.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let n=(e._localRoot||this._root).uuid,r=e._clip.uuid,s=this._actionsByClip[r];this._bindAction(e,s&&s.knownActions[0]),this._addInactiveAction(e,r,n)}let t=e._propertyBindings;for(let n=0,r=t.length;n!==r;++n){let s=t[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let n=0,r=t.length;n!==r;++n){let s=t[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){let r=this._actions,s=this._actionsByClip,o=s[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,s[t]=o;else{let a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=r.length,r.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){let t=this._actions,n=t[t.length-1],r=e._cacheIndex;n._cacheIndex=r,t[r]=n,t.pop(),e._cacheIndex=null;let s=e._clip.uuid,o=this._actionsByClip,a=o[s],l=a.knownActions,c=l[l.length-1],u=e._byClipCacheIndex;c._byClipCacheIndex=u,l[u]=c,l.pop(),e._byClipCacheIndex=null;let h=a.actionByRoot,d=(e._localRoot||this._root).uuid;delete h[d],l.length===0&&delete o[s],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let n=0,r=t.length;n!==r;++n){let s=t[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(e){let t=this._actions,n=e._cacheIndex,r=this._nActiveActions++,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=n,t[n]=s}_takeBackAction(e){let t=this._actions,n=e._cacheIndex,r=--this._nActiveActions,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=n,t[n]=s}_addInactiveBinding(e,t,n){let r=this._bindingsByRootAndName,s=this._bindings,o=r[t];o===void 0&&(o={},r[t]=o),o[n]=e,e._cacheIndex=s.length,s.push(e)}_removeInactiveBinding(e){let t=this._bindings,n=e.binding,r=n.rootNode.uuid,s=n.path,o=this._bindingsByRootAndName,a=o[r],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete a[s],Object.keys(a).length===0&&delete o[r]}_lendBinding(e){let t=this._bindings,n=e._cacheIndex,r=this._nActiveBindings++,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=n,t[n]=s}_takeBackBinding(e){let t=this._bindings,n=e._cacheIndex,r=--this._nActiveBindings,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=n,t[n]=s}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,n=e[t];return n===void 0&&(n=new Is(new Float32Array(2),new Float32Array(2),1,Ig),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){let t=this._controlInterpolants,n=e.__cacheIndex,r=--this._nActiveControlInterpolants,s=t[r];e.__cacheIndex=r,t[r]=e,s.__cacheIndex=n,t[n]=s}clipAction(e,t,n){let r=t||this._root,s=r.uuid,o=typeof e=="string"?ni.findByName(r,e):e,a=o!==null?o.uuid:e,l=this._actionsByClip[a],c=null;if(n===void 0&&(o!==null?n=o.blendMode:n=$a),l!==void 0){let h=l.actionByRoot[s];if(h!==void 0&&h.blendMode===n)return h;c=l.knownActions[0],o===null&&(o=c._clip)}if(o===null)return null;let u=new ia(this,o,t,n);return this._bindAction(u,c),this._addInactiveAction(u,a,s),u}existingAction(e,t){let n=t||this._root,r=n.uuid,s=typeof e=="string"?ni.findByName(n,e):e,o=s?s.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[r]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;let t=this._actions,n=this._nActiveActions,r=this.time+=e,s=Math.sign(e),o=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(r,e,s,o);let a=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)a[c].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,n=e.uuid,r=this._actionsByClip,s=r[n];if(s!==void 0){let o=s.knownActions;for(let a=0,l=o.length;a!==l;++a){let c=o[a];this._deactivateAction(c);let u=c._cacheIndex,h=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,h._cacheIndex=u,t[u]=h,t.pop(),this._removeInactiveBindingsForAction(c)}delete r[n]}}uncacheRoot(e){let t=e.uuid,n=this._actionsByClip;for(let o in n){let a=n[o].actionByRoot,l=a[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}let r=this._bindingsByRootAndName,s=r[t];if(s!==void 0)for(let o in s){let a=s[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){let n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}};var si=class{constructor(e,t,n,r,s,o=!1){this.isGLBufferAttribute=!0,this.name="",this.buffer=e,this.type=t,this.itemSize=n,this.elementSize=r,this.count=s,this.normalized=o,this.version=0}set needsUpdate(e){e===!0&&this.version++}setBuffer(e){return this.buffer=e,this}setType(e,t){return this.type=e,this.elementSize=t,this}setItemSize(e){return this.itemSize=e,this}setCount(e){return this.count=e,this}},Yh=new ve,Vs=class{constructor(e,t,n=0,r=1/0){this.ray=new yi(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new Pr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Yh.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Yh),this}intersectObject(e,t=!0,n=[]){return fc(e,this,n,t),n.sort(Zh),n}intersectObjects(e,t=!0,n=[]){for(let r=0,s=e.length;r<s;r++)fc(e[r],this,n,t);return n.sort(Zh),n}};function Zh(i,e){return i.distance-e.distance}function fc(i,e,t,n){let r=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(r=!1),r===!0&&n===!0){let s=i.children;for(let o=0,a=s.length;o<a;o++)fc(s[o],e,t,!0)}}var zs=class extends un{constructor(e=1){let t=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],r=new nt;r.setAttribute("position",new zt(t,3)),r.setAttribute("color",new zt(n,3));let s=new Wt({vertexColors:!0,toneMapped:!1});super(r,s),this.type="AxesHelper"}setColors(e,t,n){let r=new fe,s=this.geometry.attributes.color.array;return r.set(e),r.toArray(s,0),r.toArray(s,3),r.set(t),r.toArray(s,6),r.toArray(s,9),r.set(n),r.toArray(s,12),r.toArray(s,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}};function Fc(i,e,t,n){let r=Lg(n);switch(t){case Tc:return i*e;case _a:return i*e/r.components*r.byteLength;case xa:return i*e/r.components*r.byteLength;case wc:return i*e*2/r.components*r.byteLength;case va:return i*e*2/r.components*r.byteLength;case bc:return i*e*3/r.components*r.byteLength;case rn:return i*e*4/r.components*r.byteLength;case ya:return i*e*4/r.components*r.byteLength;case Ws:case Xs:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case qs:case Ys:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ea:case Ta:return Math.max(i,16)*Math.max(e,8)/4;case Ma:case Sa:return Math.max(i,8)*Math.max(e,8)/2;case ba:case wa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Aa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ra:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ca:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Pa:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Ia:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case La:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Na:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Ua:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Da:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Oa:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Fa:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Ba:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case ka:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Ha:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Va:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Zs:case za:case Ga:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Ac:case Wa:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Xa:case qa:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Lg(i){switch(i){case An:case Mc:return{byteLength:1,components:1};case Hr:case Ec:case Vr:return{byteLength:2,components:1};case ma:case ga:return{byteLength:2,components:4};case Si:case pa:case fn:return{byteLength:4,components:1};case Sc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"179"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="179");function ff(){let i=null,e=!1,t=null,n=null;function r(s,o){t(s,o),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function Ng(i){let e=new WeakMap;function t(a,l){let c=a.array,u=a.usage,h=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,u),a.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function n(a,l,c){let u=l.array,h=l.updateRanges;if(i.bindBuffer(c,a),h.length===0)i.bufferSubData(c,0,u);else{h.sort((f,p)=>f.start-p.start);let d=0;for(let f=1;f<h.length;f++){let p=h[d],_=h[f];_.start<=p.start+p.count+1?p.count=Math.max(p.count,_.start+_.count-p.start):(++d,h[d]=_)}h.length=d+1;for(let f=0,p=h.length;f<p;f++){let _=h[f];i.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=e.get(a);l&&(i.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}var Ug=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Dg=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Og=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Fg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Bg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,kg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Hg=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Vg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,zg=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Gg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Wg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Xg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,qg=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Yg=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Zg=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,$g=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,jg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Kg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Jg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Qg=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,e_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,t_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,n_=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,i_=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,r_=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,s_=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,o_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,a_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,l_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,c_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,u_="gl_FragColor = linearToOutputTexel( gl_FragColor );",h_=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,d_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,f_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,p_=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,m_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,g_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,__=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,x_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,v_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,y_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,M_=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,E_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,S_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,T_=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,b_=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,w_=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,A_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,R_=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,C_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,P_=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,I_=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,L_=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,N_=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,U_=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,D_=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,O_=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,F_=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,B_=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,k_=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,H_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,V_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,z_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,G_=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,W_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,X_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,q_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Y_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Z_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$_=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,j_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,K_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,J_=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Q_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,e0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,t0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,n0=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,i0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,r0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,s0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,o0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,a0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,l0=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,c0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,u0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,h0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,d0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,f0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,p0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,m0=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSEDEPTHBUF
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSEDEPTHBUF
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare , distribution.x );
		#endif
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,g0=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,_0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,x0=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,v0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,y0=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,M0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,E0=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,S0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,T0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,b0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,w0=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,A0=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,R0=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,C0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,P0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,I0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,L0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,N0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,U0=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,D0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,O0=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,F0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,B0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,k0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,H0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSEDEPTHBUF
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,V0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,z0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,G0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,W0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,X0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,q0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Y0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Z0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,j0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,K0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,J0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Q0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,ex=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,tx=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,nx=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ix=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,rx=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sx=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ox=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ax=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,lx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,cx=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ux=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,hx=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,dx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Xe={alphahash_fragment:Ug,alphahash_pars_fragment:Dg,alphamap_fragment:Og,alphamap_pars_fragment:Fg,alphatest_fragment:Bg,alphatest_pars_fragment:kg,aomap_fragment:Hg,aomap_pars_fragment:Vg,batching_pars_vertex:zg,batching_vertex:Gg,begin_vertex:Wg,beginnormal_vertex:Xg,bsdfs:qg,iridescence_fragment:Yg,bumpmap_pars_fragment:Zg,clipping_planes_fragment:$g,clipping_planes_pars_fragment:jg,clipping_planes_pars_vertex:Kg,clipping_planes_vertex:Jg,color_fragment:Qg,color_pars_fragment:e_,color_pars_vertex:t_,color_vertex:n_,common:i_,cube_uv_reflection_fragment:r_,defaultnormal_vertex:s_,displacementmap_pars_vertex:o_,displacementmap_vertex:a_,emissivemap_fragment:l_,emissivemap_pars_fragment:c_,colorspace_fragment:u_,colorspace_pars_fragment:h_,envmap_fragment:d_,envmap_common_pars_fragment:f_,envmap_pars_fragment:p_,envmap_pars_vertex:m_,envmap_physical_pars_fragment:w_,envmap_vertex:g_,fog_vertex:__,fog_pars_vertex:x_,fog_fragment:v_,fog_pars_fragment:y_,gradientmap_pars_fragment:M_,lightmap_pars_fragment:E_,lights_lambert_fragment:S_,lights_lambert_pars_fragment:T_,lights_pars_begin:b_,lights_toon_fragment:A_,lights_toon_pars_fragment:R_,lights_phong_fragment:C_,lights_phong_pars_fragment:P_,lights_physical_fragment:I_,lights_physical_pars_fragment:L_,lights_fragment_begin:N_,lights_fragment_maps:U_,lights_fragment_end:D_,logdepthbuf_fragment:O_,logdepthbuf_pars_fragment:F_,logdepthbuf_pars_vertex:B_,logdepthbuf_vertex:k_,map_fragment:H_,map_pars_fragment:V_,map_particle_fragment:z_,map_particle_pars_fragment:G_,metalnessmap_fragment:W_,metalnessmap_pars_fragment:X_,morphinstance_vertex:q_,morphcolor_vertex:Y_,morphnormal_vertex:Z_,morphtarget_pars_vertex:$_,morphtarget_vertex:j_,normal_fragment_begin:K_,normal_fragment_maps:J_,normal_pars_fragment:Q_,normal_pars_vertex:e0,normal_vertex:t0,normalmap_pars_fragment:n0,clearcoat_normal_fragment_begin:i0,clearcoat_normal_fragment_maps:r0,clearcoat_pars_fragment:s0,iridescence_pars_fragment:o0,opaque_fragment:a0,packing:l0,premultiplied_alpha_fragment:c0,project_vertex:u0,dithering_fragment:h0,dithering_pars_fragment:d0,roughnessmap_fragment:f0,roughnessmap_pars_fragment:p0,shadowmap_pars_fragment:m0,shadowmap_pars_vertex:g0,shadowmap_vertex:_0,shadowmask_pars_fragment:x0,skinbase_vertex:v0,skinning_pars_vertex:y0,skinning_vertex:M0,skinnormal_vertex:E0,specularmap_fragment:S0,specularmap_pars_fragment:T0,tonemapping_fragment:b0,tonemapping_pars_fragment:w0,transmission_fragment:A0,transmission_pars_fragment:R0,uv_pars_fragment:C0,uv_pars_vertex:P0,uv_vertex:I0,worldpos_vertex:L0,background_vert:N0,background_frag:U0,backgroundCube_vert:D0,backgroundCube_frag:O0,cube_vert:F0,cube_frag:B0,depth_vert:k0,depth_frag:H0,distanceRGBA_vert:V0,distanceRGBA_frag:z0,equirect_vert:G0,equirect_frag:W0,linedashed_vert:X0,linedashed_frag:q0,meshbasic_vert:Y0,meshbasic_frag:Z0,meshlambert_vert:$0,meshlambert_frag:j0,meshmatcap_vert:K0,meshmatcap_frag:J0,meshnormal_vert:Q0,meshnormal_frag:ex,meshphong_vert:tx,meshphong_frag:nx,meshphysical_vert:ix,meshphysical_frag:rx,meshtoon_vert:sx,meshtoon_frag:ox,points_vert:ax,points_frag:lx,shadow_vert:cx,shadow_frag:ux,sprite_vert:hx,sprite_frag:dx},ae={common:{diffuse:{value:new fe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ce},alphaMap:{value:null},alphaMapTransform:{value:new Ce},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ce}},envmap:{envMap:{value:null},envMapRotation:{value:new Ce},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ce}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ce}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ce},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ce},normalScale:{value:new Ae(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ce},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ce}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ce}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ce}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new fe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new fe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ce},alphaTest:{value:0},uvTransform:{value:new Ce}},sprite:{diffuse:{value:new fe(16777215)},opacity:{value:1},center:{value:new Ae(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ce},alphaMap:{value:null},alphaMapTransform:{value:new Ce},alphaTest:{value:0}}},Dn={basic:{uniforms:kt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.fog]),vertexShader:Xe.meshbasic_vert,fragmentShader:Xe.meshbasic_frag},lambert:{uniforms:kt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new fe(0)}}]),vertexShader:Xe.meshlambert_vert,fragmentShader:Xe.meshlambert_frag},phong:{uniforms:kt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new fe(0)},specular:{value:new fe(1118481)},shininess:{value:30}}]),vertexShader:Xe.meshphong_vert,fragmentShader:Xe.meshphong_frag},standard:{uniforms:kt([ae.common,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.roughnessmap,ae.metalnessmap,ae.fog,ae.lights,{emissive:{value:new fe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag},toon:{uniforms:kt([ae.common,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.gradientmap,ae.fog,ae.lights,{emissive:{value:new fe(0)}}]),vertexShader:Xe.meshtoon_vert,fragmentShader:Xe.meshtoon_frag},matcap:{uniforms:kt([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,{matcap:{value:null}}]),vertexShader:Xe.meshmatcap_vert,fragmentShader:Xe.meshmatcap_frag},points:{uniforms:kt([ae.points,ae.fog]),vertexShader:Xe.points_vert,fragmentShader:Xe.points_frag},dashed:{uniforms:kt([ae.common,ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xe.linedashed_vert,fragmentShader:Xe.linedashed_frag},depth:{uniforms:kt([ae.common,ae.displacementmap]),vertexShader:Xe.depth_vert,fragmentShader:Xe.depth_frag},normal:{uniforms:kt([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,{opacity:{value:1}}]),vertexShader:Xe.meshnormal_vert,fragmentShader:Xe.meshnormal_frag},sprite:{uniforms:kt([ae.sprite,ae.fog]),vertexShader:Xe.sprite_vert,fragmentShader:Xe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ce},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xe.background_vert,fragmentShader:Xe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ce}},vertexShader:Xe.backgroundCube_vert,fragmentShader:Xe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xe.cube_vert,fragmentShader:Xe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xe.equirect_vert,fragmentShader:Xe.equirect_frag},distanceRGBA:{uniforms:kt([ae.common,ae.displacementmap,{referencePosition:{value:new w},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xe.distanceRGBA_vert,fragmentShader:Xe.distanceRGBA_frag},shadow:{uniforms:kt([ae.lights,ae.fog,{color:{value:new fe(0)},opacity:{value:1}}]),vertexShader:Xe.shadow_vert,fragmentShader:Xe.shadow_frag}};Dn.physical={uniforms:kt([Dn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ce},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ce},clearcoatNormalScale:{value:new Ae(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ce},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ce},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ce},sheen:{value:0},sheenColor:{value:new fe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ce},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ce},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ce},transmissionSamplerSize:{value:new Ae},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ce},attenuationDistance:{value:0},attenuationColor:{value:new fe(0)},specularColor:{value:new fe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ce},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ce},anisotropyVector:{value:new Ae},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ce}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag};var Ka={r:0,b:0,g:0},ji=new gt,fx=new ve;function px(i,e,t,n,r,s,o){let a=new fe(0),l=s===!0?0:1,c,u,h=null,d=0,f=null;function p(S){let v=S.isScene===!0?S.background:null;return v&&v.isTexture&&(v=(S.backgroundBlurriness>0?t:e).get(v)),v}function _(S){let v=!1,A=p(S);A===null?m(a,l):A&&A.isColor&&(m(A,1),v=!0);let R=i.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,o):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(S,v){let A=p(v);A&&(A.isCubeTexture||A.mapping===Gs)?(u===void 0&&(u=new Et(new Ir(1,1,1),new tn({name:"BackgroundCubeMaterial",uniforms:$i(Dn.backgroundCube.uniforms),vertexShader:Dn.backgroundCube.vertexShader,fragmentShader:Dn.backgroundCube.fragmentShader,side:Ut,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(R,I,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),ji.copy(v.backgroundRotation),ji.x*=-1,ji.y*=-1,ji.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(ji.y*=-1,ji.z*=-1),u.material.uniforms.envMap.value=A,u.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(fx.makeRotationFromEuler(ji)),u.material.toneMapped=je.getTransfer(A.colorSpace)!==lt,(h!==A||d!==A.version||f!==i.toneMapping)&&(u.material.needsUpdate=!0,h=A,d=A.version,f=i.toneMapping),u.layers.enableAll(),S.unshift(u,u.geometry,u.material,0,0,null)):A&&A.isTexture&&(c===void 0&&(c=new Et(new Gi(2,2),new tn({name:"BackgroundMaterial",uniforms:$i(Dn.background.uniforms),vertexShader:Dn.background.vertexShader,fragmentShader:Dn.background.fragmentShader,side:en,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=A,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=je.getTransfer(A.colorSpace)!==lt,A.matrixAutoUpdate===!0&&A.updateMatrix(),c.material.uniforms.uvTransform.value.copy(A.matrix),(h!==A||d!==A.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,h=A,d=A.version,f=i.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function m(S,v){S.getRGB(Ka,Uc(i)),n.buffers.color.setClear(Ka.r,Ka.g,Ka.b,v,o)}function y(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(S,v=1){a.set(S),l=v,m(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(S){l=S,m(a,l)},render:_,addToRenderList:g,dispose:y}}function mx(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=d(null),s=r,o=!1;function a(T,C,H,z,G){let $=!1,W=h(z,H,C);s!==W&&(s=W,c(s.object)),$=f(T,z,H,G),$&&p(T,z,H,G),G!==null&&e.update(G,i.ELEMENT_ARRAY_BUFFER),($||o)&&(o=!1,v(T,C,H,z),G!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function l(){return i.createVertexArray()}function c(T){return i.bindVertexArray(T)}function u(T){return i.deleteVertexArray(T)}function h(T,C,H){let z=H.wireframe===!0,G=n[T.id];G===void 0&&(G={},n[T.id]=G);let $=G[C.id];$===void 0&&($={},G[C.id]=$);let W=$[z];return W===void 0&&(W=d(l()),$[z]=W),W}function d(T){let C=[],H=[],z=[];for(let G=0;G<t;G++)C[G]=0,H[G]=0,z[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:H,attributeDivisors:z,object:T,attributes:{},index:null}}function f(T,C,H,z){let G=s.attributes,$=C.attributes,W=0,J=H.getAttributes();for(let V in J)if(J[V].location>=0){let se=G[V],we=$[V];if(we===void 0&&(V==="instanceMatrix"&&T.instanceMatrix&&(we=T.instanceMatrix),V==="instanceColor"&&T.instanceColor&&(we=T.instanceColor)),se===void 0||se.attribute!==we||we&&se.data!==we.data)return!0;W++}return s.attributesNum!==W||s.index!==z}function p(T,C,H,z){let G={},$=C.attributes,W=0,J=H.getAttributes();for(let V in J)if(J[V].location>=0){let se=$[V];se===void 0&&(V==="instanceMatrix"&&T.instanceMatrix&&(se=T.instanceMatrix),V==="instanceColor"&&T.instanceColor&&(se=T.instanceColor));let we={};we.attribute=se,se&&se.data&&(we.data=se.data),G[V]=we,W++}s.attributes=G,s.attributesNum=W,s.index=z}function _(){let T=s.newAttributes;for(let C=0,H=T.length;C<H;C++)T[C]=0}function g(T){m(T,0)}function m(T,C){let H=s.newAttributes,z=s.enabledAttributes,G=s.attributeDivisors;H[T]=1,z[T]===0&&(i.enableVertexAttribArray(T),z[T]=1),G[T]!==C&&(i.vertexAttribDivisor(T,C),G[T]=C)}function y(){let T=s.newAttributes,C=s.enabledAttributes;for(let H=0,z=C.length;H<z;H++)C[H]!==T[H]&&(i.disableVertexAttribArray(H),C[H]=0)}function S(T,C,H,z,G,$,W){W===!0?i.vertexAttribIPointer(T,C,H,G,$):i.vertexAttribPointer(T,C,H,z,G,$)}function v(T,C,H,z){_();let G=z.attributes,$=H.getAttributes(),W=C.defaultAttributeValues;for(let J in $){let V=$[J];if(V.location>=0){let le=G[J];if(le===void 0&&(J==="instanceMatrix"&&T.instanceMatrix&&(le=T.instanceMatrix),J==="instanceColor"&&T.instanceColor&&(le=T.instanceColor)),le!==void 0){let se=le.normalized,we=le.itemSize,ze=e.get(le);if(ze===void 0)continue;let ht=ze.buffer,rt=ze.type,q=ze.bytesPerElement,ce=rt===i.INT||rt===i.UNSIGNED_INT||le.gpuType===pa;if(le.isInterleavedBufferAttribute){let re=le.data,Ie=re.stride,Le=le.offset;if(re.isInstancedInterleavedBuffer){for(let Be=0;Be<V.locationSize;Be++)m(V.location+Be,re.meshPerAttribute);T.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let Be=0;Be<V.locationSize;Be++)g(V.location+Be);i.bindBuffer(i.ARRAY_BUFFER,ht);for(let Be=0;Be<V.locationSize;Be++)S(V.location+Be,we/V.locationSize,rt,se,Ie*q,(Le+we/V.locationSize*Be)*q,ce)}else{if(le.isInstancedBufferAttribute){for(let re=0;re<V.locationSize;re++)m(V.location+re,le.meshPerAttribute);T.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let re=0;re<V.locationSize;re++)g(V.location+re);i.bindBuffer(i.ARRAY_BUFFER,ht);for(let re=0;re<V.locationSize;re++)S(V.location+re,we/V.locationSize,rt,se,we*q,we/V.locationSize*re*q,ce)}}else if(W!==void 0){let se=W[J];if(se!==void 0)switch(se.length){case 2:i.vertexAttrib2fv(V.location,se);break;case 3:i.vertexAttrib3fv(V.location,se);break;case 4:i.vertexAttrib4fv(V.location,se);break;default:i.vertexAttrib1fv(V.location,se)}}}}y()}function A(){L();for(let T in n){let C=n[T];for(let H in C){let z=C[H];for(let G in z)u(z[G].object),delete z[G];delete C[H]}delete n[T]}}function R(T){if(n[T.id]===void 0)return;let C=n[T.id];for(let H in C){let z=C[H];for(let G in z)u(z[G].object),delete z[G];delete C[H]}delete n[T.id]}function I(T){for(let C in n){let H=n[C];if(H[T.id]===void 0)continue;let z=H[T.id];for(let G in z)u(z[G].object),delete z[G];delete H[T.id]}}function L(){M(),o=!0,s!==r&&(s=r,c(s.object))}function M(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:L,resetDefaultState:M,dispose:A,releaseStatesOfGeometry:R,releaseStatesOfProgram:I,initAttributes:_,enableAttribute:g,disableUnusedAttributes:y}}function gx(i,e,t){let n;function r(c){n=c}function s(c,u){i.drawArrays(n,c,u),t.update(u,n,1)}function o(c,u,h){h!==0&&(i.drawArraysInstanced(n,c,u,h),t.update(u,n,h))}function a(c,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,h);let f=0;for(let p=0;p<h;p++)f+=u[p];t.update(f,n,1)}function l(c,u,h,d){if(h===0)return;let f=e.get("WEBGL_multi_draw");if(f===null)for(let p=0;p<c.length;p++)o(c[p],u[p],d[p]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,u,0,d,0,h);let p=0;for(let _=0;_<h;_++)p+=u[_]*d[_];t.update(p,n,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function _x(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let I=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(I){return!(I!==rn&&n.convert(I)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(I){let L=I===Vr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(I!==An&&n.convert(I)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&I!==fn&&!L)}function l(I){if(I==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let h=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),y=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),S=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=p>0,R=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:p,maxTextureSize:_,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:y,maxVaryings:S,maxFragmentUniforms:v,vertexTextures:A,maxSamples:R}}function xx(i){let e=this,t=null,n=0,r=!1,s=!1,o=new Rn,a=new Ce,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){let f=h.length!==0||d||n!==0||r;return r=d,n=h.length,f},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,f){let p=h.clippingPlanes,_=h.clipIntersection,g=h.clipShadows,m=i.get(h);if(!r||p===null||p.length===0||s&&!g)s?u(null):c();else{let y=s?0:n,S=y*4,v=m.clippingState||null;l.value=v,v=u(p,d,S,f);for(let A=0;A!==S;++A)v[A]=t[A];m.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,d,f,p){let _=h!==null?h.length:0,g=null;if(_!==0){if(g=l.value,p!==!0||g===null){let m=f+_*4,y=d.matrixWorldInverse;a.getNormalMatrix(y),(g===null||g.length<m)&&(g=new Float32Array(m));for(let S=0,v=f;S!==_;++S,v+=4)o.copy(h[S]).applyMatrix4(y,a),o.normal.toArray(g,v),g[v+3]=o.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,g}}function vx(i){let e=new WeakMap;function t(o,a){return a===ha?o.mapping=qi:a===da&&(o.mapping=Yi),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===ha||a===da)if(e.has(o)){let l=e.get(o).texture;return t(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new qo(l.height);return c.fromEquirectangularTexture(i,o),e.set(o,c),o.addEventListener("dispose",r),t(c.texture,o.mapping)}else return null}}return o}function r(o){let a=o.target;a.removeEventListener("dispose",r);let l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}var qr=4,Gd=[.125,.215,.35,.446,.526,.582],Qi=20,Bc=new ii,Wd=new fe,kc=null,Hc=0,Vc=0,zc=!1,Ji=(1+Math.sqrt(5))/2,Xr=1/Ji,Xd=[new w(-Ji,Xr,0),new w(Ji,Xr,0),new w(-Xr,0,Ji),new w(Xr,0,Ji),new w(0,Ji,-Xr),new w(0,Ji,Xr),new w(-1,1,-1),new w(1,1,-1),new w(-1,1,1),new w(1,1,1)],yx=new w,el=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100,s={}){let{size:o=256,position:a=yx}=s;kc=this._renderer.getRenderTarget(),Hc=this._renderer.getActiveCubeFace(),Vc=this._renderer.getActiveMipmapLevel(),zc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,r,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Zd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Yd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(kc,Hc,Vc),this._renderer.xr.enabled=zc,e.scissorTest=!1,Ja(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===qi||e.mapping===Yi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),kc=this._renderer.getRenderTarget(),Hc=this._renderer.getActiveCubeFace(),Vc=this._renderer.getActiveMipmapLevel(),zc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Gt,minFilter:Gt,generateMipmaps:!1,type:Vr,format:rn,colorSpace:Nt,depthBuffer:!1},r=qd(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=qd(e,t,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Mx(s)),this._blurMaterial=Ex(s,e,t)}return r}_compileMaterial(e){let t=new Et(this._lodPlanes[0],e);this._renderer.compile(t,Bc)}_sceneToCubeUV(e,t,n,r,s){let l=new wt(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,f=h.toneMapping;h.getClearColor(Wd),h.toneMapping=bn,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(r),h.clearDepth(),h.setRenderTarget(null));let _=new Bt({name:"PMREM.Background",side:Ut,depthWrite:!1,depthTest:!1}),g=new Et(new Ir,_),m=!1,y=e.background;y?y.isColor&&(_.color.copy(y),e.background=null,m=!0):(_.color.copy(Wd),m=!0);for(let S=0;S<6;S++){let v=S%3;v===0?(l.up.set(0,c[S],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[S],s.y,s.z)):v===1?(l.up.set(0,0,c[S]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[S],s.z)):(l.up.set(0,c[S],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[S]));let A=this._cubeSize;Ja(r,v*A,S>2?A:0,A,A),h.setRenderTarget(r),m&&h.render(g,l),h.render(e,l)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=d,e.background=y}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===qi||e.mapping===Yi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Zd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Yd());let s=r?this._cubemapMaterial:this._equirectMaterial,o=new Et(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;let l=this._cubeSize;Ja(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,Bc)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodPlanes.length;for(let s=1;s<r;s++){let o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Xd[(r-s-1)%Xd.length];this._blur(e,s-1,s,o,a)}t.autoClear=n}_blur(e,t,n,r,s){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,r,"latitudinal",s),this._halfBlur(o,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,h=new Et(this._lodPlanes[r],c),d=c.uniforms,f=this._sizeLods[n]-1,p=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*Qi-1),_=s/p,g=isFinite(s)?1+Math.floor(u*_):Qi;g>Qi&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Qi}`);let m=[],y=0;for(let I=0;I<Qi;++I){let L=I/_,M=Math.exp(-L*L/2);m.push(M),I===0?y+=M:I<g&&(y+=2*M)}for(let I=0;I<m.length;I++)m[I]=m[I]/y;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=m,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:S}=this;d.dTheta.value=p,d.mipInt.value=S-n;let v=this._sizeLods[r],A=3*v*(r>S-qr?r-S+qr:0),R=4*(this._cubeSize-v);Ja(t,A,R,3*v,2*v),l.setRenderTarget(t),l.render(h,Bc)}};function Mx(i){let e=[],t=[],n=[],r=i,s=i-qr+1+Gd.length;for(let o=0;o<s;o++){let a=Math.pow(2,r);t.push(a);let l=1/a;o>i-qr?l=Gd[o-i+qr-1]:o===0&&(l=0),n.push(l);let c=1/(a-2),u=-c,h=1+c,d=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,p=6,_=3,g=2,m=1,y=new Float32Array(_*p*f),S=new Float32Array(g*p*f),v=new Float32Array(m*p*f);for(let R=0;R<f;R++){let I=R%3*2/3-1,L=R>2?0:-1,M=[I,L,0,I+2/3,L,0,I+2/3,L+1,0,I,L,0,I+2/3,L+1,0,I,L+1,0];y.set(M,_*p*R),S.set(d,g*p*R);let T=[R,R,R,R,R,R];v.set(T,m*p*R)}let A=new nt;A.setAttribute("position",new ke(y,_)),A.setAttribute("uv",new ke(S,g)),A.setAttribute("faceIndex",new ke(v,m)),e.push(A),r>qr&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function qd(i,e,t){let n=new In(i,e,t);return n.texture.mapping=Gs,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ja(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function Ex(i,e,t){let n=new Float32Array(Qi),r=new w(0,1,0);return new tn({name:"SphericalGaussianBlur",defines:{n:Qi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Jc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:oi,depthTest:!1,depthWrite:!1})}function Yd(){return new tn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Jc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:oi,depthTest:!1,depthWrite:!1})}function Zd(){return new tn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Jc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:oi,depthTest:!1,depthWrite:!1})}function Jc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Sx(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){let l=a.mapping,c=l===ha||l===da,u=l===qi||l===Yi;if(c||u){let h=e.get(a),d=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new el(i)),h=c?t.fromEquirectangular(a,h):t.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),h.texture;if(h!==void 0)return h.texture;{let f=a.image;return c&&f&&f.height>0||u&&f&&r(f)?(t===null&&(t=new el(i)),h=c?t.fromEquirectangular(a):t.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),a.addEventListener("dispose",s),h.texture):null}}}return a}function r(a){let l=0,c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){let l=a.target;l.removeEventListener("dispose",s);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Tx(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let r=t(n);return r===null&&zi("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function bx(i,e,t,n){let r={},s=new WeakMap;function o(h){let d=h.target;d.index!==null&&e.remove(d.index);for(let p in d.attributes)e.remove(d.attributes[p]);d.removeEventListener("dispose",o),delete r[d.id];let f=s.get(d);f&&(e.remove(f),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(h,d){return r[d.id]===!0||(d.addEventListener("dispose",o),r[d.id]=!0,t.memory.geometries++),d}function l(h){let d=h.attributes;for(let f in d)e.update(d[f],i.ARRAY_BUFFER)}function c(h){let d=[],f=h.index,p=h.attributes.position,_=0;if(f!==null){let y=f.array;_=f.version;for(let S=0,v=y.length;S<v;S+=3){let A=y[S+0],R=y[S+1],I=y[S+2];d.push(A,R,R,I,I,A)}}else if(p!==void 0){let y=p.array;_=p.version;for(let S=0,v=y.length/3-1;S<v;S+=3){let A=S+0,R=S+1,I=S+2;d.push(A,R,R,I,I,A)}}else return;let g=new(Nc(d)?Ss:Es)(d,1);g.version=_;let m=s.get(h);m&&e.remove(m),s.set(h,g)}function u(h){let d=s.get(h);if(d){let f=h.index;f!==null&&d.version<f.version&&c(h)}else c(h);return s.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function wx(i,e,t){let n;function r(d){n=d}let s,o;function a(d){s=d.type,o=d.bytesPerElement}function l(d,f){i.drawElements(n,f,s,d*o),t.update(f,n,1)}function c(d,f,p){p!==0&&(i.drawElementsInstanced(n,f,s,d*o,p),t.update(f,n,p))}function u(d,f,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,d,0,p);let g=0;for(let m=0;m<p;m++)g+=f[m];t.update(g,n,1)}function h(d,f,p,_){if(p===0)return;let g=e.get("WEBGL_multi_draw");if(g===null)for(let m=0;m<d.length;m++)c(d[m]/o,f[m],_[m]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,s,d,0,_,0,p);let m=0;for(let y=0;y<p;y++)m+=f[y]*_[y];t.update(m,n,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function Ax(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(s/3);break;case i.LINES:t.lines+=a*(s/2);break;case i.LINE_STRIP:t.lines+=a*(s-1);break;case i.LINE_LOOP:t.lines+=a*s;break;case i.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function Rx(i,e,t){let n=new WeakMap,r=new Je;function s(o,a,l){let c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0,d=n.get(a);if(d===void 0||d.count!==h){let M=function(){I.dispose(),n.delete(a),a.removeEventListener("dispose",M)};d!==void 0&&d.texture.dispose();let f=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],y=a.morphAttributes.color||[],S=0;f===!0&&(S=1),p===!0&&(S=2),_===!0&&(S=3);let v=a.attributes.position.count*S,A=1;v>e.maxTextureSize&&(A=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);let R=new Float32Array(v*A*4*h),I=new Ms(R,v,A,h);I.type=fn,I.needsUpdate=!0;let L=S*4;for(let T=0;T<h;T++){let C=g[T],H=m[T],z=y[T],G=v*A*4*T;for(let $=0;$<C.count;$++){let W=$*L;f===!0&&(r.fromBufferAttribute(C,$),R[G+W+0]=r.x,R[G+W+1]=r.y,R[G+W+2]=r.z,R[G+W+3]=0),p===!0&&(r.fromBufferAttribute(H,$),R[G+W+4]=r.x,R[G+W+5]=r.y,R[G+W+6]=r.z,R[G+W+7]=0),_===!0&&(r.fromBufferAttribute(z,$),R[G+W+8]=r.x,R[G+W+9]=r.y,R[G+W+10]=r.z,R[G+W+11]=z.itemSize===4?r.w:1)}}d={count:h,texture:I,size:new Ae(v,A)},n.set(a,d),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];let p=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",p),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:s}}function Cx(i,e,t,n){let r=new WeakMap;function s(l){let c=n.render.frame,u=l.geometry,h=e.get(l,u);if(r.get(h)!==c&&(e.update(h),r.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){let d=l.skeleton;r.get(d)!==c&&(d.update(),r.set(d,c))}return h}function o(){r=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}var pf=new Pt,$d=new Ps(1,1),mf=new Ms,gf=new Wo,_f=new bs,jd=[],Kd=[],Jd=new Float32Array(16),Qd=new Float32Array(9),ef=new Float32Array(4);function $r(i,e,t){let n=i[0];if(n<=0||n>0)return i;let r=e*t,s=jd[r];if(s===void 0&&(s=new Float32Array(r),jd[r]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(s,a)}return s}function At(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Rt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function il(i,e){let t=Kd[e];t===void 0&&(t=new Int32Array(e),Kd[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Px(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Ix(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(At(t,e))return;i.uniform2fv(this.addr,e),Rt(t,e)}}function Lx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(At(t,e))return;i.uniform3fv(this.addr,e),Rt(t,e)}}function Nx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(At(t,e))return;i.uniform4fv(this.addr,e),Rt(t,e)}}function Ux(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(At(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Rt(t,e)}else{if(At(t,n))return;ef.set(n),i.uniformMatrix2fv(this.addr,!1,ef),Rt(t,n)}}function Dx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(At(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Rt(t,e)}else{if(At(t,n))return;Qd.set(n),i.uniformMatrix3fv(this.addr,!1,Qd),Rt(t,n)}}function Ox(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(At(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Rt(t,e)}else{if(At(t,n))return;Jd.set(n),i.uniformMatrix4fv(this.addr,!1,Jd),Rt(t,n)}}function Fx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Bx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(At(t,e))return;i.uniform2iv(this.addr,e),Rt(t,e)}}function kx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(At(t,e))return;i.uniform3iv(this.addr,e),Rt(t,e)}}function Hx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(At(t,e))return;i.uniform4iv(this.addr,e),Rt(t,e)}}function Vx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function zx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(At(t,e))return;i.uniform2uiv(this.addr,e),Rt(t,e)}}function Gx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(At(t,e))return;i.uniform3uiv(this.addr,e),Rt(t,e)}}function Wx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(At(t,e))return;i.uniform4uiv(this.addr,e),Rt(t,e)}}function Xx(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?($d.compareFunction=Cc,s=$d):s=pf,t.setTexture2D(e||s,r)}function qx(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||gf,r)}function Yx(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||_f,r)}function Zx(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||mf,r)}function $x(i){switch(i){case 5126:return Px;case 35664:return Ix;case 35665:return Lx;case 35666:return Nx;case 35674:return Ux;case 35675:return Dx;case 35676:return Ox;case 5124:case 35670:return Fx;case 35667:case 35671:return Bx;case 35668:case 35672:return kx;case 35669:case 35673:return Hx;case 5125:return Vx;case 36294:return zx;case 36295:return Gx;case 36296:return Wx;case 35678:case 36198:case 36298:case 36306:case 35682:return Xx;case 35679:case 36299:case 36307:return qx;case 35680:case 36300:case 36308:case 36293:return Yx;case 36289:case 36303:case 36311:case 36292:return Zx}}function jx(i,e){i.uniform1fv(this.addr,e)}function Kx(i,e){let t=$r(e,this.size,2);i.uniform2fv(this.addr,t)}function Jx(i,e){let t=$r(e,this.size,3);i.uniform3fv(this.addr,t)}function Qx(i,e){let t=$r(e,this.size,4);i.uniform4fv(this.addr,t)}function ev(i,e){let t=$r(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function tv(i,e){let t=$r(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function nv(i,e){let t=$r(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function iv(i,e){i.uniform1iv(this.addr,e)}function rv(i,e){i.uniform2iv(this.addr,e)}function sv(i,e){i.uniform3iv(this.addr,e)}function ov(i,e){i.uniform4iv(this.addr,e)}function av(i,e){i.uniform1uiv(this.addr,e)}function lv(i,e){i.uniform2uiv(this.addr,e)}function cv(i,e){i.uniform3uiv(this.addr,e)}function uv(i,e){i.uniform4uiv(this.addr,e)}function hv(i,e,t){let n=this.cache,r=e.length,s=il(t,r);At(n,s)||(i.uniform1iv(this.addr,s),Rt(n,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||pf,s[o])}function dv(i,e,t){let n=this.cache,r=e.length,s=il(t,r);At(n,s)||(i.uniform1iv(this.addr,s),Rt(n,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||gf,s[o])}function fv(i,e,t){let n=this.cache,r=e.length,s=il(t,r);At(n,s)||(i.uniform1iv(this.addr,s),Rt(n,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||_f,s[o])}function pv(i,e,t){let n=this.cache,r=e.length,s=il(t,r);At(n,s)||(i.uniform1iv(this.addr,s),Rt(n,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||mf,s[o])}function mv(i){switch(i){case 5126:return jx;case 35664:return Kx;case 35665:return Jx;case 35666:return Qx;case 35674:return ev;case 35675:return tv;case 35676:return nv;case 5124:case 35670:return iv;case 35667:case 35671:return rv;case 35668:case 35672:return sv;case 35669:case 35673:return ov;case 5125:return av;case 36294:return lv;case 36295:return cv;case 36296:return uv;case 35678:case 36198:case 36298:case 36306:case 35682:return hv;case 35679:case 36299:case 36307:return dv;case 35680:case 36300:case 36308:case 36293:return fv;case 36289:case 36303:case 36311:case 36292:return pv}}var Wc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=$x(t.type)}},Xc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=mv(t.type)}},qc=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let s=0,o=r.length;s!==o;++s){let a=r[s];a.setValue(e,t[a.id],n)}}},Gc=/(\w+)(\])?(\[|\.)?/g;function tf(i,e){i.seq.push(e),i.map[e.id]=e}function gv(i,e,t){let n=i.name,r=n.length;for(Gc.lastIndex=0;;){let s=Gc.exec(n),o=Gc.lastIndex,a=s[1],l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){tf(t,c===void 0?new Wc(a,i,e):new Xc(a,i,e));break}else{let h=t.map[a];h===void 0&&(h=new qc(a),tf(t,h)),t=h}}}var Yr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);gv(s,o,this)}}setValue(e,t,n,r){let s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,o=t.length;s!==o;++s){let a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,s=e.length;r!==s;++r){let o=e[r];o.id in t&&n.push(o)}return n}};function nf(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var _v=37297,xv=0;function vv(i,e){let t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var rf=new Ce;function yv(i){je._getMatrix(rf,je.workingColorSpace,i);let e=`mat3( ${rf.elements.map(t=>t.toFixed(4))} )`;switch(je.getTransfer(i)){case vs:return[e,"LinearTransferOETF"];case lt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function sf(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),s=(i.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";let o=/ERROR: 0:(\d+)/.exec(s);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+vv(i.getShaderSource(e),a)}else return s}function Mv(i,e){let t=yv(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Ev(i,e){let t;switch(e){case xd:t="Linear";break;case vd:t="Reinhard";break;case yd:t="Cineon";break;case Md:t="ACESFilmic";break;case Sd:t="AgX";break;case Td:t="Neutral";break;case Ed:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Qa=new w;function Sv(){je.getLuminanceCoefficients(Qa);let i=Qa.x.toFixed(4),e=Qa.y.toFixed(4),t=Qa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Tv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ks).join(`
`)}function bv(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function wv(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){let s=i.getActiveAttrib(e,r),o=s.name,a=1;s.type===i.FLOAT_MAT2&&(a=2),s.type===i.FLOAT_MAT3&&(a=3),s.type===i.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function Ks(i){return i!==""}function of(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function af(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Av=/^[ \t]*#include +<([\w\d./]+)>/gm;function Yc(i){return i.replace(Av,Cv)}var Rv=new Map;function Cv(i,e){let t=Xe[e];if(t===void 0){let n=Rv.get(e);if(n!==void 0)t=Xe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Yc(t)}var Pv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function lf(i){return i.replace(Pv,Iv)}function Iv(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function cf(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Lv(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===mc?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Kh?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Un&&(e="SHADOWMAP_TYPE_VSM"),e}function Nv(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case qi:case Yi:e="ENVMAP_TYPE_CUBE";break;case Gs:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Uv(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Yi:e="ENVMAP_MODE_REFRACTION";break}return e}function Dv(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case vc:e="ENVMAP_BLENDING_MULTIPLY";break;case gd:e="ENVMAP_BLENDING_MIX";break;case _d:e="ENVMAP_BLENDING_ADD";break}return e}function Ov(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Fv(i,e,t,n){let r=i.getContext(),s=t.defines,o=t.vertexShader,a=t.fragmentShader,l=Lv(t),c=Nv(t),u=Uv(t),h=Dv(t),d=Ov(t),f=Tv(t),p=bv(s),_=r.createProgram(),g,m,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Ks).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Ks).join(`
`),m.length>0&&(m+=`
`)):(g=[cf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ks).join(`
`),m=[cf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==bn?"#define TONE_MAPPING":"",t.toneMapping!==bn?Xe.tonemapping_pars_fragment:"",t.toneMapping!==bn?Ev("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Xe.colorspace_pars_fragment,Mv("linearToOutputTexel",t.outputColorSpace),Sv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ks).join(`
`)),o=Yc(o),o=of(o,t),o=af(o,t),a=Yc(a),a=of(a,t),a=af(a,t),o=lf(o),a=lf(a),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===Ic?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ic?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let S=y+g+o,v=y+m+a,A=nf(r,r.VERTEX_SHADER,S),R=nf(r,r.FRAGMENT_SHADER,v);r.attachShader(_,A),r.attachShader(_,R),t.index0AttributeName!==void 0?r.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function I(C){if(i.debug.checkShaderErrors){let H=r.getProgramInfoLog(_)||"",z=r.getShaderInfoLog(A)||"",G=r.getShaderInfoLog(R)||"",$=H.trim(),W=z.trim(),J=G.trim(),V=!0,le=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(V=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,_,A,R);else{let se=sf(r,A,"vertex"),we=sf(r,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+$+`
`+se+`
`+we)}else $!==""?console.warn("THREE.WebGLProgram: Program Info Log:",$):(W===""||J==="")&&(le=!1);le&&(C.diagnostics={runnable:V,programLog:$,vertexShader:{log:W,prefix:g},fragmentShader:{log:J,prefix:m}})}r.deleteShader(A),r.deleteShader(R),L=new Yr(r,_),M=wv(r,_)}let L;this.getUniforms=function(){return L===void 0&&I(this),L};let M;this.getAttributes=function(){return M===void 0&&I(this),M};let T=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=r.getProgramParameter(_,_v)),T},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=xv++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=A,this.fragmentShader=R,this}var Bv=0,Zc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new $c(e),t.set(e,n)),n}},$c=class{constructor(e){this.id=Bv++,this.code=e,this.usedTimes=0}};function kv(i,e,t,n,r,s,o){let a=new Pr,l=new Zc,c=new Set,u=[],h=r.logarithmicDepthBuffer,d=r.vertexTextures,f=r.precision,p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(M){return c.add(M),M===0?"uv":`uv${M}`}function g(M,T,C,H,z){let G=H.fog,$=z.geometry,W=M.isMeshStandardMaterial?H.environment:null,J=(M.isMeshStandardMaterial?t:e).get(M.envMap||W),V=J&&J.mapping===Gs?J.image.height:null,le=p[M.type];M.precision!==null&&(f=r.getMaxPrecision(M.precision),f!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));let se=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,we=se!==void 0?se.length:0,ze=0;$.morphAttributes.position!==void 0&&(ze=1),$.morphAttributes.normal!==void 0&&(ze=2),$.morphAttributes.color!==void 0&&(ze=3);let ht,rt,q,ce;if(le){let et=Dn[le];ht=et.vertexShader,rt=et.fragmentShader}else ht=M.vertexShader,rt=M.fragmentShader,l.update(M),q=l.getVertexShaderID(M),ce=l.getFragmentShaderID(M);let re=i.getRenderTarget(),Ie=i.state.buffers.depth.getReversed(),Le=z.isInstancedMesh===!0,Be=z.isBatchedMesh===!0,_t=!!M.map,Ze=!!M.matcap,N=!!J,ot=!!M.aoMap,Re=!!M.lightMap,Ke=!!M.bumpMap,be=!!M.normalMap,dt=!!M.displacementMap,pe=!!M.emissiveMap,Ge=!!M.metalnessMap,St=!!M.roughnessMap,yt=M.anisotropy>0,P=M.clearcoat>0,E=M.dispersion>0,F=M.iridescence>0,Y=M.sheen>0,j=M.transmission>0,X=yt&&!!M.anisotropyMap,Te=P&&!!M.clearcoatMap,ee=P&&!!M.clearcoatNormalMap,Me=P&&!!M.clearcoatRoughnessMap,Ee=F&&!!M.iridescenceMap,te=F&&!!M.iridescenceThicknessMap,he=Y&&!!M.sheenColorMap,Ne=Y&&!!M.sheenRoughnessMap,Se=!!M.specularMap,ue=!!M.specularColorMap,Ve=!!M.specularIntensityMap,U=j&&!!M.transmissionMap,ne=j&&!!M.thicknessMap,oe=!!M.gradientMap,me=!!M.alphaMap,K=M.alphaTest>0,Z=!!M.alphaHash,xe=!!M.extensions,He=bn;M.toneMapped&&(re===null||re.isXRRenderTarget===!0)&&(He=i.toneMapping);let st={shaderID:le,shaderType:M.type,shaderName:M.name,vertexShader:ht,fragmentShader:rt,defines:M.defines,customVertexShaderID:q,customFragmentShaderID:ce,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:Be,batchingColor:Be&&z._colorsTexture!==null,instancing:Le,instancingColor:Le&&z.instanceColor!==null,instancingMorph:Le&&z.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:re===null?i.outputColorSpace:re.isXRRenderTarget===!0?re.texture.colorSpace:Nt,alphaToCoverage:!!M.alphaToCoverage,map:_t,matcap:Ze,envMap:N,envMapMode:N&&J.mapping,envMapCubeUVHeight:V,aoMap:ot,lightMap:Re,bumpMap:Ke,normalMap:be,displacementMap:d&&dt,emissiveMap:pe,normalMapObjectSpace:be&&M.normalMapType===Pd,normalMapTangentSpace:be&&M.normalMapType===js,metalnessMap:Ge,roughnessMap:St,anisotropy:yt,anisotropyMap:X,clearcoat:P,clearcoatMap:Te,clearcoatNormalMap:ee,clearcoatRoughnessMap:Me,dispersion:E,iridescence:F,iridescenceMap:Ee,iridescenceThicknessMap:te,sheen:Y,sheenColorMap:he,sheenRoughnessMap:Ne,specularMap:Se,specularColorMap:ue,specularIntensityMap:Ve,transmission:j,transmissionMap:U,thicknessMap:ne,gradientMap:oe,opaque:M.transparent===!1&&M.blending===Fi&&M.alphaToCoverage===!1,alphaMap:me,alphaTest:K,alphaHash:Z,combine:M.combine,mapUv:_t&&_(M.map.channel),aoMapUv:ot&&_(M.aoMap.channel),lightMapUv:Re&&_(M.lightMap.channel),bumpMapUv:Ke&&_(M.bumpMap.channel),normalMapUv:be&&_(M.normalMap.channel),displacementMapUv:dt&&_(M.displacementMap.channel),emissiveMapUv:pe&&_(M.emissiveMap.channel),metalnessMapUv:Ge&&_(M.metalnessMap.channel),roughnessMapUv:St&&_(M.roughnessMap.channel),anisotropyMapUv:X&&_(M.anisotropyMap.channel),clearcoatMapUv:Te&&_(M.clearcoatMap.channel),clearcoatNormalMapUv:ee&&_(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Me&&_(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Ee&&_(M.iridescenceMap.channel),iridescenceThicknessMapUv:te&&_(M.iridescenceThicknessMap.channel),sheenColorMapUv:he&&_(M.sheenColorMap.channel),sheenRoughnessMapUv:Ne&&_(M.sheenRoughnessMap.channel),specularMapUv:Se&&_(M.specularMap.channel),specularColorMapUv:ue&&_(M.specularColorMap.channel),specularIntensityMapUv:Ve&&_(M.specularIntensityMap.channel),transmissionMapUv:U&&_(M.transmissionMap.channel),thicknessMapUv:ne&&_(M.thicknessMap.channel),alphaMapUv:me&&_(M.alphaMap.channel),vertexTangents:!!$.attributes.tangent&&(be||yt),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!$.attributes.uv&&(_t||me),fog:!!G,useFog:M.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:M.flatShading===!0&&M.wireframe===!1,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:Ie,skinning:z.isSkinnedMesh===!0,morphTargets:$.morphAttributes.position!==void 0,morphNormals:$.morphAttributes.normal!==void 0,morphColors:$.morphAttributes.color!==void 0,morphTargetsCount:we,morphTextureStride:ze,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&C.length>0,shadowMapType:i.shadowMap.type,toneMapping:He,decodeVideoTexture:_t&&M.map.isVideoTexture===!0&&je.getTransfer(M.map.colorSpace)===lt,decodeVideoTextureEmissive:pe&&M.emissiveMap.isVideoTexture===!0&&je.getTransfer(M.emissiveMap.colorSpace)===lt,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Xt,flipSided:M.side===Ut,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:xe&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(xe&&M.extensions.multiDraw===!0||Be)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return st.vertexUv1s=c.has(1),st.vertexUv2s=c.has(2),st.vertexUv3s=c.has(3),c.clear(),st}function m(M){let T=[];if(M.shaderID?T.push(M.shaderID):(T.push(M.customVertexShaderID),T.push(M.customFragmentShaderID)),M.defines!==void 0)for(let C in M.defines)T.push(C),T.push(M.defines[C]);return M.isRawShaderMaterial===!1&&(y(T,M),S(T,M),T.push(i.outputColorSpace)),T.push(M.customProgramCacheKey),T.join()}function y(M,T){M.push(T.precision),M.push(T.outputColorSpace),M.push(T.envMapMode),M.push(T.envMapCubeUVHeight),M.push(T.mapUv),M.push(T.alphaMapUv),M.push(T.lightMapUv),M.push(T.aoMapUv),M.push(T.bumpMapUv),M.push(T.normalMapUv),M.push(T.displacementMapUv),M.push(T.emissiveMapUv),M.push(T.metalnessMapUv),M.push(T.roughnessMapUv),M.push(T.anisotropyMapUv),M.push(T.clearcoatMapUv),M.push(T.clearcoatNormalMapUv),M.push(T.clearcoatRoughnessMapUv),M.push(T.iridescenceMapUv),M.push(T.iridescenceThicknessMapUv),M.push(T.sheenColorMapUv),M.push(T.sheenRoughnessMapUv),M.push(T.specularMapUv),M.push(T.specularColorMapUv),M.push(T.specularIntensityMapUv),M.push(T.transmissionMapUv),M.push(T.thicknessMapUv),M.push(T.combine),M.push(T.fogExp2),M.push(T.sizeAttenuation),M.push(T.morphTargetsCount),M.push(T.morphAttributeCount),M.push(T.numDirLights),M.push(T.numPointLights),M.push(T.numSpotLights),M.push(T.numSpotLightMaps),M.push(T.numHemiLights),M.push(T.numRectAreaLights),M.push(T.numDirLightShadows),M.push(T.numPointLightShadows),M.push(T.numSpotLightShadows),M.push(T.numSpotLightShadowsWithMaps),M.push(T.numLightProbes),M.push(T.shadowMapType),M.push(T.toneMapping),M.push(T.numClippingPlanes),M.push(T.numClipIntersection),M.push(T.depthPacking)}function S(M,T){a.disableAll(),T.supportsVertexTextures&&a.enable(0),T.instancing&&a.enable(1),T.instancingColor&&a.enable(2),T.instancingMorph&&a.enable(3),T.matcap&&a.enable(4),T.envMap&&a.enable(5),T.normalMapObjectSpace&&a.enable(6),T.normalMapTangentSpace&&a.enable(7),T.clearcoat&&a.enable(8),T.iridescence&&a.enable(9),T.alphaTest&&a.enable(10),T.vertexColors&&a.enable(11),T.vertexAlphas&&a.enable(12),T.vertexUv1s&&a.enable(13),T.vertexUv2s&&a.enable(14),T.vertexUv3s&&a.enable(15),T.vertexTangents&&a.enable(16),T.anisotropy&&a.enable(17),T.alphaHash&&a.enable(18),T.batching&&a.enable(19),T.dispersion&&a.enable(20),T.batchingColor&&a.enable(21),T.gradientMap&&a.enable(22),M.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reversedDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.decodeVideoTextureEmissive&&a.enable(20),T.alphaToCoverage&&a.enable(21),M.push(a.mask)}function v(M){let T=p[M.type],C;if(T){let H=Dn[T];C=ja.clone(H.uniforms)}else C=M.uniforms;return C}function A(M,T){let C;for(let H=0,z=u.length;H<z;H++){let G=u[H];if(G.cacheKey===T){C=G,++C.usedTimes;break}}return C===void 0&&(C=new Fv(i,T,M,s),u.push(C)),C}function R(M){if(--M.usedTimes===0){let T=u.indexOf(M);u[T]=u[u.length-1],u.pop(),M.destroy()}}function I(M){l.remove(M)}function L(){l.dispose()}return{getParameters:g,getProgramCacheKey:m,getUniforms:v,acquireProgram:A,releaseProgram:R,releaseShaderCache:I,programs:u,dispose:L}}function Hv(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function r(o,a,l){i.get(o)[a]=l}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function Vv(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function uf(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function hf(){let i=[],e=0,t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function o(h,d,f,p,_,g){let m=i[e];return m===void 0?(m={id:h.id,object:h,geometry:d,material:f,groupOrder:p,renderOrder:h.renderOrder,z:_,group:g},i[e]=m):(m.id=h.id,m.object=h,m.geometry=d,m.material=f,m.groupOrder=p,m.renderOrder=h.renderOrder,m.z=_,m.group=g),e++,m}function a(h,d,f,p,_,g){let m=o(h,d,f,p,_,g);f.transmission>0?n.push(m):f.transparent===!0?r.push(m):t.push(m)}function l(h,d,f,p,_,g){let m=o(h,d,f,p,_,g);f.transmission>0?n.unshift(m):f.transparent===!0?r.unshift(m):t.unshift(m)}function c(h,d){t.length>1&&t.sort(h||Vv),n.length>1&&n.sort(d||uf),r.length>1&&r.sort(d||uf)}function u(){for(let h=e,d=i.length;h<d;h++){let f=i[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:a,unshift:l,finish:u,sort:c}}function zv(){let i=new WeakMap;function e(n,r){let s=i.get(n),o;return s===void 0?(o=new hf,i.set(n,[o])):r>=s.length?(o=new hf,s.push(o)):o=s[r],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function Gv(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new w,color:new fe};break;case"SpotLight":t={position:new w,direction:new w,color:new fe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new w,color:new fe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new w,skyColor:new fe,groundColor:new fe};break;case"RectAreaLight":t={color:new fe,position:new w,halfWidth:new w,halfHeight:new w};break}return i[e.id]=t,t}}}function Wv(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ae};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ae};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ae,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var Xv=0;function qv(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Yv(i){let e=new Gv,t=Wv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new w);let r=new w,s=new ve,o=new ve;function a(c){let u=0,h=0,d=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let f=0,p=0,_=0,g=0,m=0,y=0,S=0,v=0,A=0,R=0,I=0;c.sort(qv);for(let M=0,T=c.length;M<T;M++){let C=c[M],H=C.color,z=C.intensity,G=C.distance,$=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)u+=H.r*z,h+=H.g*z,d+=H.b*z;else if(C.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(C.sh.coefficients[W],z);I++}else if(C.isDirectionalLight){let W=e.get(C);if(W.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){let J=C.shadow,V=t.get(C);V.shadowIntensity=J.intensity,V.shadowBias=J.bias,V.shadowNormalBias=J.normalBias,V.shadowRadius=J.radius,V.shadowMapSize=J.mapSize,n.directionalShadow[f]=V,n.directionalShadowMap[f]=$,n.directionalShadowMatrix[f]=C.shadow.matrix,y++}n.directional[f]=W,f++}else if(C.isSpotLight){let W=e.get(C);W.position.setFromMatrixPosition(C.matrixWorld),W.color.copy(H).multiplyScalar(z),W.distance=G,W.coneCos=Math.cos(C.angle),W.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),W.decay=C.decay,n.spot[_]=W;let J=C.shadow;if(C.map&&(n.spotLightMap[A]=C.map,A++,J.updateMatrices(C),C.castShadow&&R++),n.spotLightMatrix[_]=J.matrix,C.castShadow){let V=t.get(C);V.shadowIntensity=J.intensity,V.shadowBias=J.bias,V.shadowNormalBias=J.normalBias,V.shadowRadius=J.radius,V.shadowMapSize=J.mapSize,n.spotShadow[_]=V,n.spotShadowMap[_]=$,v++}_++}else if(C.isRectAreaLight){let W=e.get(C);W.color.copy(H).multiplyScalar(z),W.halfWidth.set(C.width*.5,0,0),W.halfHeight.set(0,C.height*.5,0),n.rectArea[g]=W,g++}else if(C.isPointLight){let W=e.get(C);if(W.color.copy(C.color).multiplyScalar(C.intensity),W.distance=C.distance,W.decay=C.decay,C.castShadow){let J=C.shadow,V=t.get(C);V.shadowIntensity=J.intensity,V.shadowBias=J.bias,V.shadowNormalBias=J.normalBias,V.shadowRadius=J.radius,V.shadowMapSize=J.mapSize,V.shadowCameraNear=J.camera.near,V.shadowCameraFar=J.camera.far,n.pointShadow[p]=V,n.pointShadowMap[p]=$,n.pointShadowMatrix[p]=C.shadow.matrix,S++}n.point[p]=W,p++}else if(C.isHemisphereLight){let W=e.get(C);W.skyColor.copy(C.color).multiplyScalar(z),W.groundColor.copy(C.groundColor).multiplyScalar(z),n.hemi[m]=W,m++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ae.LTC_FLOAT_1,n.rectAreaLTC2=ae.LTC_FLOAT_2):(n.rectAreaLTC1=ae.LTC_HALF_1,n.rectAreaLTC2=ae.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=d;let L=n.hash;(L.directionalLength!==f||L.pointLength!==p||L.spotLength!==_||L.rectAreaLength!==g||L.hemiLength!==m||L.numDirectionalShadows!==y||L.numPointShadows!==S||L.numSpotShadows!==v||L.numSpotMaps!==A||L.numLightProbes!==I)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=g,n.point.length=p,n.hemi.length=m,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=v+A-R,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=I,L.directionalLength=f,L.pointLength=p,L.spotLength=_,L.rectAreaLength=g,L.hemiLength=m,L.numDirectionalShadows=y,L.numPointShadows=S,L.numSpotShadows=v,L.numSpotMaps=A,L.numLightProbes=I,n.version=Xv++)}function l(c,u){let h=0,d=0,f=0,p=0,_=0,g=u.matrixWorldInverse;for(let m=0,y=c.length;m<y;m++){let S=c[m];if(S.isDirectionalLight){let v=n.directional[h];v.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(g),h++}else if(S.isSpotLight){let v=n.spot[f];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(g),v.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(g),f++}else if(S.isRectAreaLight){let v=n.rectArea[p];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(g),o.identity(),s.copy(S.matrixWorld),s.premultiply(g),o.extractRotation(s),v.halfWidth.set(S.width*.5,0,0),v.halfHeight.set(0,S.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),p++}else if(S.isPointLight){let v=n.point[d];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(g),d++}else if(S.isHemisphereLight){let v=n.hemi[_];v.direction.setFromMatrixPosition(S.matrixWorld),v.direction.transformDirection(g),_++}}}return{setup:a,setupView:l,state:n}}function df(i){let e=new Yv(i),t=[],n=[];function r(u){c.camera=u,t.length=0,n.length=0}function s(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}let c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function Zv(i){let e=new WeakMap;function t(r,s=0){let o=e.get(r),a;return o===void 0?(a=new df(i),e.set(r,[a])):s>=o.length?(a=new df(i),o.push(a)):a=o[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var $v=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,jv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Kv(i,e,t){let n=new Dr,r=new Ae,s=new Ae,o=new Je,a=new $o({depthPacking:Cd}),l=new jo,c={},u=t.maxTextureSize,h={[en]:Ut,[Ut]:en,[Xt]:Xt},d=new tn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ae},radius:{value:4}},vertexShader:$v,fragmentShader:jv}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let p=new nt;p.setAttribute("position",new ke(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new Et(p,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=mc;let m=this.type;this.render=function(R,I,L){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||R.length===0)return;let M=i.getRenderTarget(),T=i.getActiveCubeFace(),C=i.getActiveMipmapLevel(),H=i.state;H.setBlending(oi),H.buffers.depth.getReversed()?H.buffers.color.setClear(0,0,0,0):H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);let z=m!==Un&&this.type===Un,G=m===Un&&this.type!==Un;for(let $=0,W=R.length;$<W;$++){let J=R[$],V=J.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;r.copy(V.mapSize);let le=V.getFrameExtents();if(r.multiply(le),s.copy(V.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/le.x),r.x=s.x*le.x,V.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/le.y),r.y=s.y*le.y,V.mapSize.y=s.y)),V.map===null||z===!0||G===!0){let we=this.type!==Un?{minFilter:Lt,magFilter:Lt}:{};V.map!==null&&V.map.dispose(),V.map=new In(r.x,r.y,we),V.map.texture.name=J.name+".shadowMap",V.camera.updateProjectionMatrix()}i.setRenderTarget(V.map),i.clear();let se=V.getViewportCount();for(let we=0;we<se;we++){let ze=V.getViewport(we);o.set(s.x*ze.x,s.y*ze.y,s.x*ze.z,s.y*ze.w),H.viewport(o),V.updateMatrices(J,we),n=V.getFrustum(),v(I,L,V.camera,J,this.type)}V.isPointLightShadow!==!0&&this.type===Un&&y(V,L),V.needsUpdate=!1}m=this.type,g.needsUpdate=!1,i.setRenderTarget(M,T,C)};function y(R,I){let L=e.update(_);d.defines.VSM_SAMPLES!==R.blurSamples&&(d.defines.VSM_SAMPLES=R.blurSamples,f.defines.VSM_SAMPLES=R.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new In(r.x,r.y)),d.uniforms.shadow_pass.value=R.map.texture,d.uniforms.resolution.value=R.mapSize,d.uniforms.radius.value=R.radius,i.setRenderTarget(R.mapPass),i.clear(),i.renderBufferDirect(I,null,L,d,_,null),f.uniforms.shadow_pass.value=R.mapPass.texture,f.uniforms.resolution.value=R.mapSize,f.uniforms.radius.value=R.radius,i.setRenderTarget(R.map),i.clear(),i.renderBufferDirect(I,null,L,f,_,null)}function S(R,I,L,M){let T=null,C=L.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(C!==void 0)T=C;else if(T=L.isPointLight===!0?l:a,i.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){let H=T.uuid,z=I.uuid,G=c[H];G===void 0&&(G={},c[H]=G);let $=G[z];$===void 0&&($=T.clone(),G[z]=$,I.addEventListener("dispose",A)),T=$}if(T.visible=I.visible,T.wireframe=I.wireframe,M===Un?T.side=I.shadowSide!==null?I.shadowSide:I.side:T.side=I.shadowSide!==null?I.shadowSide:h[I.side],T.alphaMap=I.alphaMap,T.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,T.map=I.map,T.clipShadows=I.clipShadows,T.clippingPlanes=I.clippingPlanes,T.clipIntersection=I.clipIntersection,T.displacementMap=I.displacementMap,T.displacementScale=I.displacementScale,T.displacementBias=I.displacementBias,T.wireframeLinewidth=I.wireframeLinewidth,T.linewidth=I.linewidth,L.isPointLight===!0&&T.isMeshDistanceMaterial===!0){let H=i.properties.get(T);H.light=L}return T}function v(R,I,L,M,T){if(R.visible===!1)return;if(R.layers.test(I.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&T===Un)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,R.matrixWorld);let z=e.update(R),G=R.material;if(Array.isArray(G)){let $=z.groups;for(let W=0,J=$.length;W<J;W++){let V=$[W],le=G[V.materialIndex];if(le&&le.visible){let se=S(R,le,M,T);R.onBeforeShadow(i,R,I,L,z,se,V),i.renderBufferDirect(L,null,z,se,R,V),R.onAfterShadow(i,R,I,L,z,se,V)}}}else if(G.visible){let $=S(R,G,M,T);R.onBeforeShadow(i,R,I,L,z,$,null),i.renderBufferDirect(L,null,z,$,R,null),R.onAfterShadow(i,R,I,L,z,$,null)}}let H=R.children;for(let z=0,G=H.length;z<G;z++)v(H[z],I,L,M,T)}function A(R){R.target.removeEventListener("dispose",A);for(let L in c){let M=c[L],T=R.target.uuid;T in M&&(M[T].dispose(),delete M[T])}}}var Jv={[ra]:sa,[oa]:ca,[aa]:ua,[Bi]:la,[sa]:ra,[ca]:oa,[ua]:aa,[la]:Bi};function Qv(i,e){function t(){let U=!1,ne=new Je,oe=null,me=new Je(0,0,0,0);return{setMask:function(K){oe!==K&&!U&&(i.colorMask(K,K,K,K),oe=K)},setLocked:function(K){U=K},setClear:function(K,Z,xe,He,st){st===!0&&(K*=He,Z*=He,xe*=He),ne.set(K,Z,xe,He),me.equals(ne)===!1&&(i.clearColor(K,Z,xe,He),me.copy(ne))},reset:function(){U=!1,oe=null,me.set(-1,0,0,0)}}}function n(){let U=!1,ne=!1,oe=null,me=null,K=null;return{setReversed:function(Z){if(ne!==Z){let xe=e.get("EXT_clip_control");Z?xe.clipControlEXT(xe.LOWER_LEFT_EXT,xe.ZERO_TO_ONE_EXT):xe.clipControlEXT(xe.LOWER_LEFT_EXT,xe.NEGATIVE_ONE_TO_ONE_EXT),ne=Z;let He=K;K=null,this.setClear(He)}},getReversed:function(){return ne},setTest:function(Z){Z?re(i.DEPTH_TEST):Ie(i.DEPTH_TEST)},setMask:function(Z){oe!==Z&&!U&&(i.depthMask(Z),oe=Z)},setFunc:function(Z){if(ne&&(Z=Jv[Z]),me!==Z){switch(Z){case ra:i.depthFunc(i.NEVER);break;case sa:i.depthFunc(i.ALWAYS);break;case oa:i.depthFunc(i.LESS);break;case Bi:i.depthFunc(i.LEQUAL);break;case aa:i.depthFunc(i.EQUAL);break;case la:i.depthFunc(i.GEQUAL);break;case ca:i.depthFunc(i.GREATER);break;case ua:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}me=Z}},setLocked:function(Z){U=Z},setClear:function(Z){K!==Z&&(ne&&(Z=1-Z),i.clearDepth(Z),K=Z)},reset:function(){U=!1,oe=null,me=null,K=null,ne=!1}}}function r(){let U=!1,ne=null,oe=null,me=null,K=null,Z=null,xe=null,He=null,st=null;return{setTest:function(et){U||(et?re(i.STENCIL_TEST):Ie(i.STENCIL_TEST))},setMask:function(et){ne!==et&&!U&&(i.stencilMask(et),ne=et)},setFunc:function(et,xn,sn){(oe!==et||me!==xn||K!==sn)&&(i.stencilFunc(et,xn,sn),oe=et,me=xn,K=sn)},setOp:function(et,xn,sn){(Z!==et||xe!==xn||He!==sn)&&(i.stencilOp(et,xn,sn),Z=et,xe=xn,He=sn)},setLocked:function(et){U=et},setClear:function(et){st!==et&&(i.clearStencil(et),st=et)},reset:function(){U=!1,ne=null,oe=null,me=null,K=null,Z=null,xe=null,He=null,st=null}}}let s=new t,o=new n,a=new r,l=new WeakMap,c=new WeakMap,u={},h={},d=new WeakMap,f=[],p=null,_=!1,g=null,m=null,y=null,S=null,v=null,A=null,R=null,I=new fe(0,0,0),L=0,M=!1,T=null,C=null,H=null,z=null,G=null,$=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),W=!1,J=0,V=i.getParameter(i.VERSION);V.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(V)[1]),W=J>=1):V.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),W=J>=2);let le=null,se={},we=i.getParameter(i.SCISSOR_BOX),ze=i.getParameter(i.VIEWPORT),ht=new Je().fromArray(we),rt=new Je().fromArray(ze);function q(U,ne,oe,me){let K=new Uint8Array(4),Z=i.createTexture();i.bindTexture(U,Z),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let xe=0;xe<oe;xe++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(ne,0,i.RGBA,1,1,me,0,i.RGBA,i.UNSIGNED_BYTE,K):i.texImage2D(ne+xe,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,K);return Z}let ce={};ce[i.TEXTURE_2D]=q(i.TEXTURE_2D,i.TEXTURE_2D,1),ce[i.TEXTURE_CUBE_MAP]=q(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ce[i.TEXTURE_2D_ARRAY]=q(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ce[i.TEXTURE_3D]=q(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),re(i.DEPTH_TEST),o.setFunc(Bi),Ke(!1),be(pc),re(i.CULL_FACE),ot(oi);function re(U){u[U]!==!0&&(i.enable(U),u[U]=!0)}function Ie(U){u[U]!==!1&&(i.disable(U),u[U]=!1)}function Le(U,ne){return h[U]!==ne?(i.bindFramebuffer(U,ne),h[U]=ne,U===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=ne),U===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=ne),!0):!1}function Be(U,ne){let oe=f,me=!1;if(U){oe=d.get(ne),oe===void 0&&(oe=[],d.set(ne,oe));let K=U.textures;if(oe.length!==K.length||oe[0]!==i.COLOR_ATTACHMENT0){for(let Z=0,xe=K.length;Z<xe;Z++)oe[Z]=i.COLOR_ATTACHMENT0+Z;oe.length=K.length,me=!0}}else oe[0]!==i.BACK&&(oe[0]=i.BACK,me=!0);me&&i.drawBuffers(oe)}function _t(U){return p!==U?(i.useProgram(U),p=U,!0):!1}let Ze={[xi]:i.FUNC_ADD,[Qh]:i.FUNC_SUBTRACT,[ed]:i.FUNC_REVERSE_SUBTRACT};Ze[td]=i.MIN,Ze[nd]=i.MAX;let N={[id]:i.ZERO,[rd]:i.ONE,[sd]:i.SRC_COLOR,[ko]:i.SRC_ALPHA,[hd]:i.SRC_ALPHA_SATURATE,[cd]:i.DST_COLOR,[ad]:i.DST_ALPHA,[od]:i.ONE_MINUS_SRC_COLOR,[Ho]:i.ONE_MINUS_SRC_ALPHA,[ud]:i.ONE_MINUS_DST_COLOR,[ld]:i.ONE_MINUS_DST_ALPHA,[dd]:i.CONSTANT_COLOR,[fd]:i.ONE_MINUS_CONSTANT_COLOR,[pd]:i.CONSTANT_ALPHA,[md]:i.ONE_MINUS_CONSTANT_ALPHA};function ot(U,ne,oe,me,K,Z,xe,He,st,et){if(U===oi){_===!0&&(Ie(i.BLEND),_=!1);return}if(_===!1&&(re(i.BLEND),_=!0),U!==Jh){if(U!==g||et!==M){if((m!==xi||v!==xi)&&(i.blendEquation(i.FUNC_ADD),m=xi,v=xi),et)switch(U){case Fi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case gc:i.blendFunc(i.ONE,i.ONE);break;case _c:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case xc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Fi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case gc:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case _c:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case xc:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}y=null,S=null,A=null,R=null,I.set(0,0,0),L=0,g=U,M=et}return}K=K||ne,Z=Z||oe,xe=xe||me,(ne!==m||K!==v)&&(i.blendEquationSeparate(Ze[ne],Ze[K]),m=ne,v=K),(oe!==y||me!==S||Z!==A||xe!==R)&&(i.blendFuncSeparate(N[oe],N[me],N[Z],N[xe]),y=oe,S=me,A=Z,R=xe),(He.equals(I)===!1||st!==L)&&(i.blendColor(He.r,He.g,He.b,st),I.copy(He),L=st),g=U,M=!1}function Re(U,ne){U.side===Xt?Ie(i.CULL_FACE):re(i.CULL_FACE);let oe=U.side===Ut;ne&&(oe=!oe),Ke(oe),U.blending===Fi&&U.transparent===!1?ot(oi):ot(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),s.setMask(U.colorWrite);let me=U.stencilWrite;a.setTest(me),me&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),pe(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?re(i.SAMPLE_ALPHA_TO_COVERAGE):Ie(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ke(U){T!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),T=U)}function be(U){U!==$h?(re(i.CULL_FACE),U!==C&&(U===pc?i.cullFace(i.BACK):U===jh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ie(i.CULL_FACE),C=U}function dt(U){U!==H&&(W&&i.lineWidth(U),H=U)}function pe(U,ne,oe){U?(re(i.POLYGON_OFFSET_FILL),(z!==ne||G!==oe)&&(i.polygonOffset(ne,oe),z=ne,G=oe)):Ie(i.POLYGON_OFFSET_FILL)}function Ge(U){U?re(i.SCISSOR_TEST):Ie(i.SCISSOR_TEST)}function St(U){U===void 0&&(U=i.TEXTURE0+$-1),le!==U&&(i.activeTexture(U),le=U)}function yt(U,ne,oe){oe===void 0&&(le===null?oe=i.TEXTURE0+$-1:oe=le);let me=se[oe];me===void 0&&(me={type:void 0,texture:void 0},se[oe]=me),(me.type!==U||me.texture!==ne)&&(le!==oe&&(i.activeTexture(oe),le=oe),i.bindTexture(U,ne||ce[U]),me.type=U,me.texture=ne)}function P(){let U=se[le];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function E(){try{i.compressedTexImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function F(){try{i.compressedTexImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Y(){try{i.texSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function j(){try{i.texSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function X(){try{i.compressedTexSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Te(){try{i.compressedTexSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ee(){try{i.texStorage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Me(){try{i.texStorage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ee(){try{i.texImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function te(){try{i.texImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function he(U){ht.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),ht.copy(U))}function Ne(U){rt.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),rt.copy(U))}function Se(U,ne){let oe=c.get(ne);oe===void 0&&(oe=new WeakMap,c.set(ne,oe));let me=oe.get(U);me===void 0&&(me=i.getUniformBlockIndex(ne,U.name),oe.set(U,me))}function ue(U,ne){let me=c.get(ne).get(U);l.get(ne)!==me&&(i.uniformBlockBinding(ne,me,U.__bindingPointIndex),l.set(ne,me))}function Ve(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},le=null,se={},h={},d=new WeakMap,f=[],p=null,_=!1,g=null,m=null,y=null,S=null,v=null,A=null,R=null,I=new fe(0,0,0),L=0,M=!1,T=null,C=null,H=null,z=null,G=null,ht.set(0,0,i.canvas.width,i.canvas.height),rt.set(0,0,i.canvas.width,i.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:re,disable:Ie,bindFramebuffer:Le,drawBuffers:Be,useProgram:_t,setBlending:ot,setMaterial:Re,setFlipSided:Ke,setCullFace:be,setLineWidth:dt,setPolygonOffset:pe,setScissorTest:Ge,activeTexture:St,bindTexture:yt,unbindTexture:P,compressedTexImage2D:E,compressedTexImage3D:F,texImage2D:Ee,texImage3D:te,updateUBOMapping:Se,uniformBlockBinding:ue,texStorage2D:ee,texStorage3D:Me,texSubImage2D:Y,texSubImage3D:j,compressedTexSubImage2D:X,compressedTexSubImage3D:Te,scissor:he,viewport:Ne,reset:Ve}}function ey(i,e,t,n,r,s,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ae,u=new WeakMap,h,d=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch(P){}function p(P,E){return f?new OffscreenCanvas(P,E):Rr("canvas")}function _(P,E,F){let Y=1,j=yt(P);if((j.width>F||j.height>F)&&(Y=F/Math.max(j.width,j.height)),Y<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){let X=Math.floor(Y*j.width),Te=Math.floor(Y*j.height);h===void 0&&(h=p(X,Te));let ee=E?p(X,Te):h;return ee.width=X,ee.height=Te,ee.getContext("2d").drawImage(P,0,0,X,Te),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+X+"x"+Te+")."),ee}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),P;return P}function g(P){return P.generateMipmaps}function m(P){i.generateMipmap(P)}function y(P){return P.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?i.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function S(P,E,F,Y,j=!1){if(P!==null){if(i[P]!==void 0)return i[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let X=E;if(E===i.RED&&(F===i.FLOAT&&(X=i.R32F),F===i.HALF_FLOAT&&(X=i.R16F),F===i.UNSIGNED_BYTE&&(X=i.R8)),E===i.RED_INTEGER&&(F===i.UNSIGNED_BYTE&&(X=i.R8UI),F===i.UNSIGNED_SHORT&&(X=i.R16UI),F===i.UNSIGNED_INT&&(X=i.R32UI),F===i.BYTE&&(X=i.R8I),F===i.SHORT&&(X=i.R16I),F===i.INT&&(X=i.R32I)),E===i.RG&&(F===i.FLOAT&&(X=i.RG32F),F===i.HALF_FLOAT&&(X=i.RG16F),F===i.UNSIGNED_BYTE&&(X=i.RG8)),E===i.RG_INTEGER&&(F===i.UNSIGNED_BYTE&&(X=i.RG8UI),F===i.UNSIGNED_SHORT&&(X=i.RG16UI),F===i.UNSIGNED_INT&&(X=i.RG32UI),F===i.BYTE&&(X=i.RG8I),F===i.SHORT&&(X=i.RG16I),F===i.INT&&(X=i.RG32I)),E===i.RGB_INTEGER&&(F===i.UNSIGNED_BYTE&&(X=i.RGB8UI),F===i.UNSIGNED_SHORT&&(X=i.RGB16UI),F===i.UNSIGNED_INT&&(X=i.RGB32UI),F===i.BYTE&&(X=i.RGB8I),F===i.SHORT&&(X=i.RGB16I),F===i.INT&&(X=i.RGB32I)),E===i.RGBA_INTEGER&&(F===i.UNSIGNED_BYTE&&(X=i.RGBA8UI),F===i.UNSIGNED_SHORT&&(X=i.RGBA16UI),F===i.UNSIGNED_INT&&(X=i.RGBA32UI),F===i.BYTE&&(X=i.RGBA8I),F===i.SHORT&&(X=i.RGBA16I),F===i.INT&&(X=i.RGBA32I)),E===i.RGB&&F===i.UNSIGNED_INT_5_9_9_9_REV&&(X=i.RGB9_E5),E===i.RGBA){let Te=j?vs:je.getTransfer(Y);F===i.FLOAT&&(X=i.RGBA32F),F===i.HALF_FLOAT&&(X=i.RGBA16F),F===i.UNSIGNED_BYTE&&(X=Te===lt?i.SRGB8_ALPHA8:i.RGBA8),F===i.UNSIGNED_SHORT_4_4_4_4&&(X=i.RGBA4),F===i.UNSIGNED_SHORT_5_5_5_1&&(X=i.RGB5_A1)}return(X===i.R16F||X===i.R32F||X===i.RG16F||X===i.RG32F||X===i.RGBA16F||X===i.RGBA32F)&&e.get("EXT_color_buffer_float"),X}function v(P,E){let F;return P?E===null||E===Si||E===zr?F=i.DEPTH24_STENCIL8:E===fn?F=i.DEPTH32F_STENCIL8:E===Hr&&(F=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===Si||E===zr?F=i.DEPTH_COMPONENT24:E===fn?F=i.DEPTH_COMPONENT32F:E===Hr&&(F=i.DEPTH_COMPONENT16),F}function A(P,E){return g(P)===!0||P.isFramebufferTexture&&P.minFilter!==Lt&&P.minFilter!==Gt?Math.log2(Math.max(E.width,E.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?E.mipmaps.length:1}function R(P){let E=P.target;E.removeEventListener("dispose",R),L(E),E.isVideoTexture&&u.delete(E)}function I(P){let E=P.target;E.removeEventListener("dispose",I),T(E)}function L(P){let E=n.get(P);if(E.__webglInit===void 0)return;let F=P.source,Y=d.get(F);if(Y){let j=Y[E.__cacheKey];j.usedTimes--,j.usedTimes===0&&M(P),Object.keys(Y).length===0&&d.delete(F)}n.remove(P)}function M(P){let E=n.get(P);i.deleteTexture(E.__webglTexture);let F=P.source,Y=d.get(F);delete Y[E.__cacheKey],o.memory.textures--}function T(P){let E=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(E.__webglFramebuffer[Y]))for(let j=0;j<E.__webglFramebuffer[Y].length;j++)i.deleteFramebuffer(E.__webglFramebuffer[Y][j]);else i.deleteFramebuffer(E.__webglFramebuffer[Y]);E.__webglDepthbuffer&&i.deleteRenderbuffer(E.__webglDepthbuffer[Y])}else{if(Array.isArray(E.__webglFramebuffer))for(let Y=0;Y<E.__webglFramebuffer.length;Y++)i.deleteFramebuffer(E.__webglFramebuffer[Y]);else i.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&i.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&i.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let Y=0;Y<E.__webglColorRenderbuffer.length;Y++)E.__webglColorRenderbuffer[Y]&&i.deleteRenderbuffer(E.__webglColorRenderbuffer[Y]);E.__webglDepthRenderbuffer&&i.deleteRenderbuffer(E.__webglDepthRenderbuffer)}let F=P.textures;for(let Y=0,j=F.length;Y<j;Y++){let X=n.get(F[Y]);X.__webglTexture&&(i.deleteTexture(X.__webglTexture),o.memory.textures--),n.remove(F[Y])}n.remove(P)}let C=0;function H(){C=0}function z(){let P=C;return P>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+r.maxTextures),C+=1,P}function G(P){let E=[];return E.push(P.wrapS),E.push(P.wrapT),E.push(P.wrapR||0),E.push(P.magFilter),E.push(P.minFilter),E.push(P.anisotropy),E.push(P.internalFormat),E.push(P.format),E.push(P.type),E.push(P.generateMipmaps),E.push(P.premultiplyAlpha),E.push(P.flipY),E.push(P.unpackAlignment),E.push(P.colorSpace),E.join()}function $(P,E){let F=n.get(P);if(P.isVideoTexture&&Ge(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&F.__version!==P.version){let Y=P.image;if(Y===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ce(F,P,E);return}}else P.isExternalTexture&&(F.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,F.__webglTexture,i.TEXTURE0+E)}function W(P,E){let F=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&F.__version!==P.version){ce(F,P,E);return}t.bindTexture(i.TEXTURE_2D_ARRAY,F.__webglTexture,i.TEXTURE0+E)}function J(P,E){let F=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&F.__version!==P.version){ce(F,P,E);return}t.bindTexture(i.TEXTURE_3D,F.__webglTexture,i.TEXTURE0+E)}function V(P,E){let F=n.get(P);if(P.version>0&&F.__version!==P.version){re(F,P,E);return}t.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture,i.TEXTURE0+E)}let le={[vi]:i.REPEAT,[Cn]:i.CLAMP_TO_EDGE,[wr]:i.MIRRORED_REPEAT},se={[Lt]:i.NEAREST,[fa]:i.NEAREST_MIPMAP_NEAREST,[Zi]:i.NEAREST_MIPMAP_LINEAR,[Gt]:i.LINEAR,[kr]:i.LINEAR_MIPMAP_NEAREST,[wn]:i.LINEAR_MIPMAP_LINEAR},we={[Id]:i.NEVER,[Fd]:i.ALWAYS,[Ld]:i.LESS,[Cc]:i.LEQUAL,[Nd]:i.EQUAL,[Od]:i.GEQUAL,[Ud]:i.GREATER,[Dd]:i.NOTEQUAL};function ze(P,E){if(E.type===fn&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===Gt||E.magFilter===kr||E.magFilter===Zi||E.magFilter===wn||E.minFilter===Gt||E.minFilter===kr||E.minFilter===Zi||E.minFilter===wn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(P,i.TEXTURE_WRAP_S,le[E.wrapS]),i.texParameteri(P,i.TEXTURE_WRAP_T,le[E.wrapT]),(P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY)&&i.texParameteri(P,i.TEXTURE_WRAP_R,le[E.wrapR]),i.texParameteri(P,i.TEXTURE_MAG_FILTER,se[E.magFilter]),i.texParameteri(P,i.TEXTURE_MIN_FILTER,se[E.minFilter]),E.compareFunction&&(i.texParameteri(P,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(P,i.TEXTURE_COMPARE_FUNC,we[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===Lt||E.minFilter!==Zi&&E.minFilter!==wn||E.type===fn&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){let F=e.get("EXT_texture_filter_anisotropic");i.texParameterf(P,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,r.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function ht(P,E){let F=!1;P.__webglInit===void 0&&(P.__webglInit=!0,E.addEventListener("dispose",R));let Y=E.source,j=d.get(Y);j===void 0&&(j={},d.set(Y,j));let X=G(E);if(X!==P.__cacheKey){j[X]===void 0&&(j[X]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,F=!0),j[X].usedTimes++;let Te=j[P.__cacheKey];Te!==void 0&&(j[P.__cacheKey].usedTimes--,Te.usedTimes===0&&M(E)),P.__cacheKey=X,P.__webglTexture=j[X].texture}return F}function rt(P,E,F){return Math.floor(Math.floor(P/F)/E)}function q(P,E,F,Y){let X=P.updateRanges;if(X.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,E.width,E.height,F,Y,E.data);else{X.sort((te,he)=>te.start-he.start);let Te=0;for(let te=1;te<X.length;te++){let he=X[Te],Ne=X[te],Se=he.start+he.count,ue=rt(Ne.start,E.width,4),Ve=rt(he.start,E.width,4);Ne.start<=Se+1&&ue===Ve&&rt(Ne.start+Ne.count-1,E.width,4)===ue?he.count=Math.max(he.count,Ne.start+Ne.count-he.start):(++Te,X[Te]=Ne)}X.length=Te+1;let ee=i.getParameter(i.UNPACK_ROW_LENGTH),Me=i.getParameter(i.UNPACK_SKIP_PIXELS),Ee=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,E.width);for(let te=0,he=X.length;te<he;te++){let Ne=X[te],Se=Math.floor(Ne.start/4),ue=Math.ceil(Ne.count/4),Ve=Se%E.width,U=Math.floor(Se/E.width),ne=ue,oe=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ve),i.pixelStorei(i.UNPACK_SKIP_ROWS,U),t.texSubImage2D(i.TEXTURE_2D,0,Ve,U,ne,oe,F,Y,E.data)}P.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,ee),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Me),i.pixelStorei(i.UNPACK_SKIP_ROWS,Ee)}}function ce(P,E,F){let Y=i.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(Y=i.TEXTURE_2D_ARRAY),E.isData3DTexture&&(Y=i.TEXTURE_3D);let j=ht(P,E),X=E.source;t.bindTexture(Y,P.__webglTexture,i.TEXTURE0+F);let Te=n.get(X);if(X.version!==Te.__version||j===!0){t.activeTexture(i.TEXTURE0+F);let ee=je.getPrimaries(je.workingColorSpace),Me=E.colorSpace===ai?null:je.getPrimaries(E.colorSpace),Ee=E.colorSpace===ai||ee===Me?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee);let te=_(E.image,!1,r.maxTextureSize);te=St(E,te);let he=s.convert(E.format,E.colorSpace),Ne=s.convert(E.type),Se=S(E.internalFormat,he,Ne,E.colorSpace,E.isVideoTexture);ze(Y,E);let ue,Ve=E.mipmaps,U=E.isVideoTexture!==!0,ne=Te.__version===void 0||j===!0,oe=X.dataReady,me=A(E,te);if(E.isDepthTexture)Se=v(E.format===Gr,E.type),ne&&(U?t.texStorage2D(i.TEXTURE_2D,1,Se,te.width,te.height):t.texImage2D(i.TEXTURE_2D,0,Se,te.width,te.height,0,he,Ne,null));else if(E.isDataTexture)if(Ve.length>0){U&&ne&&t.texStorage2D(i.TEXTURE_2D,me,Se,Ve[0].width,Ve[0].height);for(let K=0,Z=Ve.length;K<Z;K++)ue=Ve[K],U?oe&&t.texSubImage2D(i.TEXTURE_2D,K,0,0,ue.width,ue.height,he,Ne,ue.data):t.texImage2D(i.TEXTURE_2D,K,Se,ue.width,ue.height,0,he,Ne,ue.data);E.generateMipmaps=!1}else U?(ne&&t.texStorage2D(i.TEXTURE_2D,me,Se,te.width,te.height),oe&&q(E,te,he,Ne)):t.texImage2D(i.TEXTURE_2D,0,Se,te.width,te.height,0,he,Ne,te.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){U&&ne&&t.texStorage3D(i.TEXTURE_2D_ARRAY,me,Se,Ve[0].width,Ve[0].height,te.depth);for(let K=0,Z=Ve.length;K<Z;K++)if(ue=Ve[K],E.format!==rn)if(he!==null)if(U){if(oe)if(E.layerUpdates.size>0){let xe=Fc(ue.width,ue.height,E.format,E.type);for(let He of E.layerUpdates){let st=ue.data.subarray(He*xe/ue.data.BYTES_PER_ELEMENT,(He+1)*xe/ue.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,K,0,0,He,ue.width,ue.height,1,he,st)}E.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,K,0,0,0,ue.width,ue.height,te.depth,he,ue.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,K,Se,ue.width,ue.height,te.depth,0,ue.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else U?oe&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,K,0,0,0,ue.width,ue.height,te.depth,he,Ne,ue.data):t.texImage3D(i.TEXTURE_2D_ARRAY,K,Se,ue.width,ue.height,te.depth,0,he,Ne,ue.data)}else{U&&ne&&t.texStorage2D(i.TEXTURE_2D,me,Se,Ve[0].width,Ve[0].height);for(let K=0,Z=Ve.length;K<Z;K++)ue=Ve[K],E.format!==rn?he!==null?U?oe&&t.compressedTexSubImage2D(i.TEXTURE_2D,K,0,0,ue.width,ue.height,he,ue.data):t.compressedTexImage2D(i.TEXTURE_2D,K,Se,ue.width,ue.height,0,ue.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):U?oe&&t.texSubImage2D(i.TEXTURE_2D,K,0,0,ue.width,ue.height,he,Ne,ue.data):t.texImage2D(i.TEXTURE_2D,K,Se,ue.width,ue.height,0,he,Ne,ue.data)}else if(E.isDataArrayTexture)if(U){if(ne&&t.texStorage3D(i.TEXTURE_2D_ARRAY,me,Se,te.width,te.height,te.depth),oe)if(E.layerUpdates.size>0){let K=Fc(te.width,te.height,E.format,E.type);for(let Z of E.layerUpdates){let xe=te.data.subarray(Z*K/te.data.BYTES_PER_ELEMENT,(Z+1)*K/te.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Z,te.width,te.height,1,he,Ne,xe)}E.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,he,Ne,te.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Se,te.width,te.height,te.depth,0,he,Ne,te.data);else if(E.isData3DTexture)U?(ne&&t.texStorage3D(i.TEXTURE_3D,me,Se,te.width,te.height,te.depth),oe&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,he,Ne,te.data)):t.texImage3D(i.TEXTURE_3D,0,Se,te.width,te.height,te.depth,0,he,Ne,te.data);else if(E.isFramebufferTexture){if(ne)if(U)t.texStorage2D(i.TEXTURE_2D,me,Se,te.width,te.height);else{let K=te.width,Z=te.height;for(let xe=0;xe<me;xe++)t.texImage2D(i.TEXTURE_2D,xe,Se,K,Z,0,he,Ne,null),K>>=1,Z>>=1}}else if(Ve.length>0){if(U&&ne){let K=yt(Ve[0]);t.texStorage2D(i.TEXTURE_2D,me,Se,K.width,K.height)}for(let K=0,Z=Ve.length;K<Z;K++)ue=Ve[K],U?oe&&t.texSubImage2D(i.TEXTURE_2D,K,0,0,he,Ne,ue):t.texImage2D(i.TEXTURE_2D,K,Se,he,Ne,ue);E.generateMipmaps=!1}else if(U){if(ne){let K=yt(te);t.texStorage2D(i.TEXTURE_2D,me,Se,K.width,K.height)}oe&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,he,Ne,te)}else t.texImage2D(i.TEXTURE_2D,0,Se,he,Ne,te);g(E)&&m(Y),Te.__version=X.version,E.onUpdate&&E.onUpdate(E)}P.__version=E.version}function re(P,E,F){if(E.image.length!==6)return;let Y=ht(P,E),j=E.source;t.bindTexture(i.TEXTURE_CUBE_MAP,P.__webglTexture,i.TEXTURE0+F);let X=n.get(j);if(j.version!==X.__version||Y===!0){t.activeTexture(i.TEXTURE0+F);let Te=je.getPrimaries(je.workingColorSpace),ee=E.colorSpace===ai?null:je.getPrimaries(E.colorSpace),Me=E.colorSpace===ai||Te===ee?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me);let Ee=E.isCompressedTexture||E.image[0].isCompressedTexture,te=E.image[0]&&E.image[0].isDataTexture,he=[];for(let Z=0;Z<6;Z++)!Ee&&!te?he[Z]=_(E.image[Z],!0,r.maxCubemapSize):he[Z]=te?E.image[Z].image:E.image[Z],he[Z]=St(E,he[Z]);let Ne=he[0],Se=s.convert(E.format,E.colorSpace),ue=s.convert(E.type),Ve=S(E.internalFormat,Se,ue,E.colorSpace),U=E.isVideoTexture!==!0,ne=X.__version===void 0||Y===!0,oe=j.dataReady,me=A(E,Ne);ze(i.TEXTURE_CUBE_MAP,E);let K;if(Ee){U&&ne&&t.texStorage2D(i.TEXTURE_CUBE_MAP,me,Ve,Ne.width,Ne.height);for(let Z=0;Z<6;Z++){K=he[Z].mipmaps;for(let xe=0;xe<K.length;xe++){let He=K[xe];E.format!==rn?Se!==null?U?oe&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,xe,0,0,He.width,He.height,Se,He.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,xe,Ve,He.width,He.height,0,He.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?oe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,xe,0,0,He.width,He.height,Se,ue,He.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,xe,Ve,He.width,He.height,0,Se,ue,He.data)}}}else{if(K=E.mipmaps,U&&ne){K.length>0&&me++;let Z=yt(he[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,me,Ve,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(te){U?oe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,he[Z].width,he[Z].height,Se,ue,he[Z].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Ve,he[Z].width,he[Z].height,0,Se,ue,he[Z].data);for(let xe=0;xe<K.length;xe++){let st=K[xe].image[Z].image;U?oe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,xe+1,0,0,st.width,st.height,Se,ue,st.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,xe+1,Ve,st.width,st.height,0,Se,ue,st.data)}}else{U?oe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,Se,ue,he[Z]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Ve,Se,ue,he[Z]);for(let xe=0;xe<K.length;xe++){let He=K[xe];U?oe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,xe+1,0,0,Se,ue,He.image[Z]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,xe+1,Ve,Se,ue,He.image[Z])}}}g(E)&&m(i.TEXTURE_CUBE_MAP),X.__version=j.version,E.onUpdate&&E.onUpdate(E)}P.__version=E.version}function Ie(P,E,F,Y,j,X){let Te=s.convert(F.format,F.colorSpace),ee=s.convert(F.type),Me=S(F.internalFormat,Te,ee,F.colorSpace),Ee=n.get(E),te=n.get(F);if(te.__renderTarget=E,!Ee.__hasExternalTextures){let he=Math.max(1,E.width>>X),Ne=Math.max(1,E.height>>X);j===i.TEXTURE_3D||j===i.TEXTURE_2D_ARRAY?t.texImage3D(j,X,Me,he,Ne,E.depth,0,Te,ee,null):t.texImage2D(j,X,Me,he,Ne,0,Te,ee,null)}t.bindFramebuffer(i.FRAMEBUFFER,P),pe(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Y,j,te.__webglTexture,0,dt(E)):(j===i.TEXTURE_2D||j>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Y,j,te.__webglTexture,X),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Le(P,E,F){if(i.bindRenderbuffer(i.RENDERBUFFER,P),E.depthBuffer){let Y=E.depthTexture,j=Y&&Y.isDepthTexture?Y.type:null,X=v(E.stencilBuffer,j),Te=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ee=dt(E);pe(E)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ee,X,E.width,E.height):F?i.renderbufferStorageMultisample(i.RENDERBUFFER,ee,X,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,X,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Te,i.RENDERBUFFER,P)}else{let Y=E.textures;for(let j=0;j<Y.length;j++){let X=Y[j],Te=s.convert(X.format,X.colorSpace),ee=s.convert(X.type),Me=S(X.internalFormat,Te,ee,X.colorSpace),Ee=dt(E);F&&pe(E)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ee,Me,E.width,E.height):pe(E)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ee,Me,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,Me,E.width,E.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Be(P,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,P),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let Y=n.get(E.depthTexture);Y.__renderTarget=E,(!Y.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),$(E.depthTexture,0);let j=Y.__webglTexture,X=dt(E);if(E.depthTexture.format===Ar)pe(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,j,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,j,0);else if(E.depthTexture.format===Gr)pe(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,j,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,j,0);else throw new Error("Unknown depthTexture format")}function _t(P){let E=n.get(P),F=P.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==P.depthTexture){let Y=P.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),Y){let j=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,Y.removeEventListener("dispose",j)};Y.addEventListener("dispose",j),E.__depthDisposeCallback=j}E.__boundDepthTexture=Y}if(P.depthTexture&&!E.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");let Y=P.texture.mipmaps;Y&&Y.length>0?Be(E.__webglFramebuffer[0],P):Be(E.__webglFramebuffer,P)}else if(F){E.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer[Y]),E.__webglDepthbuffer[Y]===void 0)E.__webglDepthbuffer[Y]=i.createRenderbuffer(),Le(E.__webglDepthbuffer[Y],P,!1);else{let j=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=E.__webglDepthbuffer[Y];i.bindRenderbuffer(i.RENDERBUFFER,X),i.framebufferRenderbuffer(i.FRAMEBUFFER,j,i.RENDERBUFFER,X)}}else{let Y=P.texture.mipmaps;if(Y&&Y.length>0?t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=i.createRenderbuffer(),Le(E.__webglDepthbuffer,P,!1);else{let j=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=E.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,X),i.framebufferRenderbuffer(i.FRAMEBUFFER,j,i.RENDERBUFFER,X)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ze(P,E,F){let Y=n.get(P);E!==void 0&&Ie(Y.__webglFramebuffer,P,P.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),F!==void 0&&_t(P)}function N(P){let E=P.texture,F=n.get(P),Y=n.get(E);P.addEventListener("dispose",I);let j=P.textures,X=P.isWebGLCubeRenderTarget===!0,Te=j.length>1;if(Te||(Y.__webglTexture===void 0&&(Y.__webglTexture=i.createTexture()),Y.__version=E.version,o.memory.textures++),X){F.__webglFramebuffer=[];for(let ee=0;ee<6;ee++)if(E.mipmaps&&E.mipmaps.length>0){F.__webglFramebuffer[ee]=[];for(let Me=0;Me<E.mipmaps.length;Me++)F.__webglFramebuffer[ee][Me]=i.createFramebuffer()}else F.__webglFramebuffer[ee]=i.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){F.__webglFramebuffer=[];for(let ee=0;ee<E.mipmaps.length;ee++)F.__webglFramebuffer[ee]=i.createFramebuffer()}else F.__webglFramebuffer=i.createFramebuffer();if(Te)for(let ee=0,Me=j.length;ee<Me;ee++){let Ee=n.get(j[ee]);Ee.__webglTexture===void 0&&(Ee.__webglTexture=i.createTexture(),o.memory.textures++)}if(P.samples>0&&pe(P)===!1){F.__webglMultisampledFramebuffer=i.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let ee=0;ee<j.length;ee++){let Me=j[ee];F.__webglColorRenderbuffer[ee]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,F.__webglColorRenderbuffer[ee]);let Ee=s.convert(Me.format,Me.colorSpace),te=s.convert(Me.type),he=S(Me.internalFormat,Ee,te,Me.colorSpace,P.isXRRenderTarget===!0),Ne=dt(P);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ne,he,P.width,P.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ee,i.RENDERBUFFER,F.__webglColorRenderbuffer[ee])}i.bindRenderbuffer(i.RENDERBUFFER,null),P.depthBuffer&&(F.__webglDepthRenderbuffer=i.createRenderbuffer(),Le(F.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(X){t.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),ze(i.TEXTURE_CUBE_MAP,E);for(let ee=0;ee<6;ee++)if(E.mipmaps&&E.mipmaps.length>0)for(let Me=0;Me<E.mipmaps.length;Me++)Ie(F.__webglFramebuffer[ee][Me],P,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Me);else Ie(F.__webglFramebuffer[ee],P,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0);g(E)&&m(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Te){for(let ee=0,Me=j.length;ee<Me;ee++){let Ee=j[ee],te=n.get(Ee),he=i.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(he=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(he,te.__webglTexture),ze(he,Ee),Ie(F.__webglFramebuffer,P,Ee,i.COLOR_ATTACHMENT0+ee,he,0),g(Ee)&&m(he)}t.unbindTexture()}else{let ee=i.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(ee=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ee,Y.__webglTexture),ze(ee,E),E.mipmaps&&E.mipmaps.length>0)for(let Me=0;Me<E.mipmaps.length;Me++)Ie(F.__webglFramebuffer[Me],P,E,i.COLOR_ATTACHMENT0,ee,Me);else Ie(F.__webglFramebuffer,P,E,i.COLOR_ATTACHMENT0,ee,0);g(E)&&m(ee),t.unbindTexture()}P.depthBuffer&&_t(P)}function ot(P){let E=P.textures;for(let F=0,Y=E.length;F<Y;F++){let j=E[F];if(g(j)){let X=y(P),Te=n.get(j).__webglTexture;t.bindTexture(X,Te),m(X),t.unbindTexture()}}}let Re=[],Ke=[];function be(P){if(P.samples>0){if(pe(P)===!1){let E=P.textures,F=P.width,Y=P.height,j=i.COLOR_BUFFER_BIT,X=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Te=n.get(P),ee=E.length>1;if(ee)for(let Ee=0;Ee<E.length;Ee++)t.bindFramebuffer(i.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Te.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Te.__webglMultisampledFramebuffer);let Me=P.texture.mipmaps;Me&&Me.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Te.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Te.__webglFramebuffer);for(let Ee=0;Ee<E.length;Ee++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(j|=i.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(j|=i.STENCIL_BUFFER_BIT)),ee){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Te.__webglColorRenderbuffer[Ee]);let te=n.get(E[Ee]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,te,0)}i.blitFramebuffer(0,0,F,Y,0,0,F,Y,j,i.NEAREST),l===!0&&(Re.length=0,Ke.length=0,Re.push(i.COLOR_ATTACHMENT0+Ee),P.depthBuffer&&P.resolveDepthBuffer===!1&&(Re.push(X),Ke.push(X),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Ke)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Re))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ee)for(let Ee=0;Ee<E.length;Ee++){t.bindFramebuffer(i.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.RENDERBUFFER,Te.__webglColorRenderbuffer[Ee]);let te=n.get(E[Ee]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Te.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.TEXTURE_2D,te,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Te.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&l){let E=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[E])}}}function dt(P){return Math.min(r.maxSamples,P.samples)}function pe(P){let E=n.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function Ge(P){let E=o.render.frame;u.get(P)!==E&&(u.set(P,E),P.update())}function St(P,E){let F=P.colorSpace,Y=P.format,j=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||F!==Nt&&F!==ai&&(je.getTransfer(F)===lt?(Y!==rn||j!==An)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),E}function yt(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=z,this.resetTextureUnits=H,this.setTexture2D=$,this.setTexture2DArray=W,this.setTexture3D=J,this.setTextureCube=V,this.rebindTextures=Ze,this.setupRenderTarget=N,this.updateRenderTargetMipmap=ot,this.updateMultisampleRenderTarget=be,this.setupDepthRenderbuffer=_t,this.setupFrameBufferTexture=Ie,this.useMultisampledRTT=pe}function ty(i,e){function t(n,r=ai){let s,o=je.getTransfer(r);if(n===An)return i.UNSIGNED_BYTE;if(n===ma)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ga)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Sc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Mc)return i.BYTE;if(n===Ec)return i.SHORT;if(n===Hr)return i.UNSIGNED_SHORT;if(n===pa)return i.INT;if(n===Si)return i.UNSIGNED_INT;if(n===fn)return i.FLOAT;if(n===Vr)return i.HALF_FLOAT;if(n===Tc)return i.ALPHA;if(n===bc)return i.RGB;if(n===rn)return i.RGBA;if(n===Ar)return i.DEPTH_COMPONENT;if(n===Gr)return i.DEPTH_STENCIL;if(n===_a)return i.RED;if(n===xa)return i.RED_INTEGER;if(n===wc)return i.RG;if(n===va)return i.RG_INTEGER;if(n===ya)return i.RGBA_INTEGER;if(n===Ws||n===Xs||n===qs||n===Ys)if(o===lt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Ws)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Xs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===qs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ys)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Ws)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Xs)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===qs)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ys)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ma||n===Ea||n===Sa||n===Ta)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Ma)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ea)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Sa)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ta)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ba||n===wa||n===Aa)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===ba||n===wa)return o===lt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Aa)return o===lt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ra||n===Ca||n===Pa||n===Ia||n===La||n===Na||n===Ua||n===Da||n===Oa||n===Fa||n===Ba||n===ka||n===Ha||n===Va)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Ra)return o===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ca)return o===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Pa)return o===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ia)return o===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===La)return o===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Na)return o===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ua)return o===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Da)return o===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Oa)return o===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Fa)return o===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ba)return o===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ka)return o===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ha)return o===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Va)return o===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Zs||n===za||n===Ga)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Zs)return o===lt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===za)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ga)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ac||n===Wa||n===Xa||n===qa)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Zs)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Wa)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Xa)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===qa)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===zr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var tl=class extends Pt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}},ny=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,iy=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,jc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new tl(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new tn({vertexShader:ny,fragmentShader:iy,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Et(new Gi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Kc=class extends Pn{constructor(e,t){super();let n=this,r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,d=null,f=null,p=null,_=new jc,g={},m=t.getContextAttributes(),y=null,S=null,v=[],A=[],R=new Ae,I=null,L=new wt;L.viewport=new Je;let M=new wt;M.viewport=new Je;let T=[L,M],C=new ta,H=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let ce=v[q];return ce===void 0&&(ce=new Lr,v[q]=ce),ce.getTargetRaySpace()},this.getControllerGrip=function(q){let ce=v[q];return ce===void 0&&(ce=new Lr,v[q]=ce),ce.getGripSpace()},this.getHand=function(q){let ce=v[q];return ce===void 0&&(ce=new Lr,v[q]=ce),ce.getHandSpace()};function G(q){let ce=A.indexOf(q.inputSource);if(ce===-1)return;let re=v[ce];re!==void 0&&(re.update(q.inputSource,q.frame,c||o),re.dispatchEvent({type:q.type,data:q.inputSource}))}function $(){r.removeEventListener("select",G),r.removeEventListener("selectstart",G),r.removeEventListener("selectend",G),r.removeEventListener("squeeze",G),r.removeEventListener("squeezestart",G),r.removeEventListener("squeezeend",G),r.removeEventListener("end",$),r.removeEventListener("inputsourceschange",W);for(let q=0;q<v.length;q++){let ce=A[q];ce!==null&&(A[q]=null,v[q].disconnect(ce))}H=null,z=null,_.reset();for(let q in g)delete g[q];e.setRenderTarget(y),f=null,d=null,h=null,r=null,S=null,rt.stop(),n.isPresenting=!1,e.setPixelRatio(I),e.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){s=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){a=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(q){if(r=q,r!==null){if(y=e.getRenderTarget(),r.addEventListener("select",G),r.addEventListener("selectstart",G),r.addEventListener("selectend",G),r.addEventListener("squeeze",G),r.addEventListener("squeezestart",G),r.addEventListener("squeezeend",G),r.addEventListener("end",$),r.addEventListener("inputsourceschange",W),m.xrCompatible!==!0&&await t.makeXRCompatible(),I=e.getPixelRatio(),e.getSize(R),typeof XRWebGLBinding<"u"&&(h=new XRWebGLBinding(r,t)),h!==null&&"createProjectionLayer"in XRWebGLBinding.prototype){let re=null,Ie=null,Le=null;m.depth&&(Le=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,re=m.stencil?Gr:Ar,Ie=m.stencil?zr:Si);let Be={colorFormat:t.RGBA8,depthFormat:Le,scaleFactor:s};d=h.createProjectionLayer(Be),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),S=new In(d.textureWidth,d.textureHeight,{format:rn,type:An,depthTexture:new Ps(d.textureWidth,d.textureHeight,Ie,void 0,void 0,void 0,void 0,void 0,void 0,re),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let re={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(r,t,re),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),S=new In(f.framebufferWidth,f.framebufferHeight,{format:rn,type:An,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),rt.setContext(r),rt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function W(q){for(let ce=0;ce<q.removed.length;ce++){let re=q.removed[ce],Ie=A.indexOf(re);Ie>=0&&(A[Ie]=null,v[Ie].disconnect(re))}for(let ce=0;ce<q.added.length;ce++){let re=q.added[ce],Ie=A.indexOf(re);if(Ie===-1){for(let Be=0;Be<v.length;Be++)if(Be>=A.length){A.push(re),Ie=Be;break}else if(A[Be]===null){A[Be]=re,Ie=Be;break}if(Ie===-1)break}let Le=v[Ie];Le&&Le.connect(re)}}let J=new w,V=new w;function le(q,ce,re){J.setFromMatrixPosition(ce.matrixWorld),V.setFromMatrixPosition(re.matrixWorld);let Ie=J.distanceTo(V),Le=ce.projectionMatrix.elements,Be=re.projectionMatrix.elements,_t=Le[14]/(Le[10]-1),Ze=Le[14]/(Le[10]+1),N=(Le[9]+1)/Le[5],ot=(Le[9]-1)/Le[5],Re=(Le[8]-1)/Le[0],Ke=(Be[8]+1)/Be[0],be=_t*Re,dt=_t*Ke,pe=Ie/(-Re+Ke),Ge=pe*-Re;if(ce.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(Ge),q.translateZ(pe),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),Le[10]===-1)q.projectionMatrix.copy(ce.projectionMatrix),q.projectionMatrixInverse.copy(ce.projectionMatrixInverse);else{let St=_t+pe,yt=Ze+pe,P=be-Ge,E=dt+(Ie-Ge),F=N*Ze/yt*St,Y=ot*Ze/yt*St;q.projectionMatrix.makePerspective(P,E,F,Y,St,yt),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function se(q,ce){ce===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(ce.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(r===null)return;let ce=q.near,re=q.far;_.texture!==null&&(_.depthNear>0&&(ce=_.depthNear),_.depthFar>0&&(re=_.depthFar)),C.near=M.near=L.near=ce,C.far=M.far=L.far=re,(H!==C.near||z!==C.far)&&(r.updateRenderState({depthNear:C.near,depthFar:C.far}),H=C.near,z=C.far),C.layers.mask=q.layers.mask|6,L.layers.mask=C.layers.mask&3,M.layers.mask=C.layers.mask&5;let Ie=q.parent,Le=C.cameras;se(C,Ie);for(let Be=0;Be<Le.length;Be++)se(Le[Be],Ie);Le.length===2?le(C,L,M):C.projectionMatrix.copy(L.projectionMatrix),we(q,C,Ie)};function we(q,ce,re){re===null?q.matrix.copy(ce.matrixWorld):(q.matrix.copy(re.matrixWorld),q.matrix.invert(),q.matrix.multiply(ce.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(ce.projectionMatrix),q.projectionMatrixInverse.copy(ce.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Vi*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return C},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(q){l=q,d!==null&&(d.fixedFoveation=q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=q)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(C)},this.getCameraTexture=function(q){return g[q]};let ze=null;function ht(q,ce){if(u=ce.getViewerPose(c||o),p=ce,u!==null){let re=u.views;f!==null&&(e.setRenderTargetFramebuffer(S,f.framebuffer),e.setRenderTarget(S));let Ie=!1;re.length!==C.cameras.length&&(C.cameras.length=0,Ie=!0);for(let Ze=0;Ze<re.length;Ze++){let N=re[Ze],ot=null;if(f!==null)ot=f.getViewport(N);else{let Ke=h.getViewSubImage(d,N);ot=Ke.viewport,Ze===0&&(e.setRenderTargetTextures(S,Ke.colorTexture,Ke.depthStencilTexture),e.setRenderTarget(S))}let Re=T[Ze];Re===void 0&&(Re=new wt,Re.layers.enable(Ze),Re.viewport=new Je,T[Ze]=Re),Re.matrix.fromArray(N.transform.matrix),Re.matrix.decompose(Re.position,Re.quaternion,Re.scale),Re.projectionMatrix.fromArray(N.projectionMatrix),Re.projectionMatrixInverse.copy(Re.projectionMatrix).invert(),Re.viewport.set(ot.x,ot.y,ot.width,ot.height),Ze===0&&(C.matrix.copy(Re.matrix),C.matrix.decompose(C.position,C.quaternion,C.scale)),Ie===!0&&C.cameras.push(Re)}let Le=r.enabledFeatures;if(Le&&Le.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&h){let Ze=h.getDepthInformation(re[0]);Ze&&Ze.isValid&&Ze.texture&&_.init(Ze,r.renderState)}if(Le&&Le.includes("camera-access")&&(e.state.unbindTexture(),h))for(let Ze=0;Ze<re.length;Ze++){let N=re[Ze].camera;if(N){let ot=g[N];ot||(ot=new tl,g[N]=ot);let Re=h.getCameraImage(N);ot.sourceTexture=Re}}}for(let re=0;re<v.length;re++){let Ie=A[re],Le=v[re];Ie!==null&&Le!==void 0&&Le.update(Ie,ce,c||o)}ze&&ze(q,ce),ce.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ce}),p=null}let rt=new ff;rt.setAnimationLoop(ht),this.setAnimationLoop=function(q){ze=q},this.dispose=function(){}}},Ki=new gt,ry=new ve;function sy(i,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,Uc(i)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function r(g,m,y,S,v){m.isMeshBasicMaterial||m.isMeshLambertMaterial?s(g,m):m.isMeshToonMaterial?(s(g,m),h(g,m)):m.isMeshPhongMaterial?(s(g,m),u(g,m)):m.isMeshStandardMaterial?(s(g,m),d(g,m),m.isMeshPhysicalMaterial&&f(g,m,v)):m.isMeshMatcapMaterial?(s(g,m),p(g,m)):m.isMeshDepthMaterial?s(g,m):m.isMeshDistanceMaterial?(s(g,m),_(g,m)):m.isMeshNormalMaterial?s(g,m):m.isLineBasicMaterial?(o(g,m),m.isLineDashedMaterial&&a(g,m)):m.isPointsMaterial?l(g,m,y,S):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===Ut&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===Ut&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);let y=e.get(m),S=y.envMap,v=y.envMapRotation;S&&(g.envMap.value=S,Ki.copy(v),Ki.x*=-1,Ki.y*=-1,Ki.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Ki.y*=-1,Ki.z*=-1),g.envMapRotation.value.setFromMatrix4(ry.makeRotationFromEuler(Ki)),g.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function o(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function a(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,y,S){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*y,g.scale.value=S*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function u(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function h(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function d(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,y){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Ut&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=y.texture,g.transmissionSamplerSize.value.set(y.width,y.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function _(g,m){let y=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(y.matrixWorld),g.nearDistance.value=y.shadow.camera.near,g.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function oy(i,e,t,n){let r={},s={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,S){let v=S.program;n.uniformBlockBinding(y,v)}function c(y,S){let v=r[y.id];v===void 0&&(p(y),v=u(y),r[y.id]=v,y.addEventListener("dispose",g));let A=S.program;n.updateUBOMapping(y,A);let R=e.render.frame;s[y.id]!==R&&(d(y),s[y.id]=R)}function u(y){let S=h();y.__bindingPointIndex=S;let v=i.createBuffer(),A=y.__size,R=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,A,R),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,v),v}function h(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){let S=r[y.id],v=y.uniforms,A=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let R=0,I=v.length;R<I;R++){let L=Array.isArray(v[R])?v[R]:[v[R]];for(let M=0,T=L.length;M<T;M++){let C=L[M];if(f(C,R,M,A)===!0){let H=C.__offset,z=Array.isArray(C.value)?C.value:[C.value],G=0;for(let $=0;$<z.length;$++){let W=z[$],J=_(W);typeof W=="number"||typeof W=="boolean"?(C.__data[0]=W,i.bufferSubData(i.UNIFORM_BUFFER,H+G,C.__data)):W.isMatrix3?(C.__data[0]=W.elements[0],C.__data[1]=W.elements[1],C.__data[2]=W.elements[2],C.__data[3]=0,C.__data[4]=W.elements[3],C.__data[5]=W.elements[4],C.__data[6]=W.elements[5],C.__data[7]=0,C.__data[8]=W.elements[6],C.__data[9]=W.elements[7],C.__data[10]=W.elements[8],C.__data[11]=0):(W.toArray(C.__data,G),G+=J.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,H,C.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(y,S,v,A){let R=y.value,I=S+"_"+v;if(A[I]===void 0)return typeof R=="number"||typeof R=="boolean"?A[I]=R:A[I]=R.clone(),!0;{let L=A[I];if(typeof R=="number"||typeof R=="boolean"){if(L!==R)return A[I]=R,!0}else if(L.equals(R)===!1)return L.copy(R),!0}return!1}function p(y){let S=y.uniforms,v=0,A=16;for(let I=0,L=S.length;I<L;I++){let M=Array.isArray(S[I])?S[I]:[S[I]];for(let T=0,C=M.length;T<C;T++){let H=M[T],z=Array.isArray(H.value)?H.value:[H.value];for(let G=0,$=z.length;G<$;G++){let W=z[G],J=_(W),V=v%A,le=V%J.boundary,se=V+le;v+=le,se!==0&&A-se<J.storage&&(v+=A-se),H.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=v,v+=J.storage}}}let R=v%A;return R>0&&(v+=A-R),y.__size=v,y.__cache={},this}function _(y){let S={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(S.boundary=4,S.storage=4):y.isVector2?(S.boundary=8,S.storage=8):y.isVector3||y.isColor?(S.boundary=16,S.storage=12):y.isVector4?(S.boundary=16,S.storage=16):y.isMatrix3?(S.boundary=48,S.storage=48):y.isMatrix4?(S.boundary=64,S.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),S}function g(y){let S=y.target;S.removeEventListener("dispose",g);let v=o.indexOf(S.__bindingPointIndex);o.splice(v,1),i.deleteBuffer(r[S.id]),delete r[S.id],delete s[S.id]}function m(){for(let y in r)i.deleteBuffer(r[y]);o=[],r={},s={}}return{bind:l,update:c,dispose:m}}var nl=class{constructor(e={}){let{canvas:t=Bd(),context:n=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;let p=new Uint32Array(4),_=new Int32Array(4),g=null,m=null,y=[],S=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=bn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let v=this,A=!1;this._outputColorSpace=Tt;let R=0,I=0,L=null,M=-1,T=null,C=new Je,H=new Je,z=null,G=new fe(0),$=0,W=t.width,J=t.height,V=1,le=null,se=null,we=new Je(0,0,W,J),ze=new Je(0,0,W,J),ht=!1,rt=new Dr,q=!1,ce=!1,re=new ve,Ie=new w,Le=new Je,Be={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},_t=!1;function Ze(){return L===null?V:1}let N=n;function ot(b,D){return t.getContext(b,D)}try{let b={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"179"}`),t.addEventListener("webglcontextlost",oe,!1),t.addEventListener("webglcontextrestored",me,!1),t.addEventListener("webglcontextcreationerror",K,!1),N===null){let D="webgl2";if(N=ot(D,b),N===null)throw ot(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let Re,Ke,be,dt,pe,Ge,St,yt,P,E,F,Y,j,X,Te,ee,Me,Ee,te,he,Ne,Se,ue,Ve;function U(){Re=new Tx(N),Re.init(),Se=new ty(N,Re),Ke=new _x(N,Re,e,Se),be=new Qv(N,Re),Ke.reversedDepthBuffer&&d&&be.buffers.depth.setReversed(!0),dt=new Ax(N),pe=new Hv,Ge=new ey(N,Re,be,pe,Ke,Se,dt),St=new vx(v),yt=new Sx(v),P=new Ng(N),ue=new mx(N,P),E=new bx(N,P,dt,ue),F=new Cx(N,E,P,dt),te=new Rx(N,Ke,Ge),ee=new xx(pe),Y=new kv(v,St,yt,Re,Ke,ue,ee),j=new sy(v,pe),X=new zv,Te=new Zv(Re),Ee=new px(v,St,yt,be,F,f,l),Me=new Kv(v,F,Ke),Ve=new oy(N,dt,Ke,be),he=new gx(N,Re,dt),Ne=new wx(N,Re,dt),dt.programs=Y.programs,v.capabilities=Ke,v.extensions=Re,v.properties=pe,v.renderLists=X,v.shadowMap=Me,v.state=be,v.info=dt}U();let ne=new Kc(v,N);this.xr=ne,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){let b=Re.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){let b=Re.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(b){b!==void 0&&(V=b,this.setSize(W,J,!1))},this.getSize=function(b){return b.set(W,J)},this.setSize=function(b,D,B=!0){if(ne.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=b,J=D,t.width=Math.floor(b*V),t.height=Math.floor(D*V),B===!0&&(t.style.width=b+"px",t.style.height=D+"px"),this.setViewport(0,0,b,D)},this.getDrawingBufferSize=function(b){return b.set(W*V,J*V).floor()},this.setDrawingBufferSize=function(b,D,B){W=b,J=D,V=B,t.width=Math.floor(b*B),t.height=Math.floor(D*B),this.setViewport(0,0,b,D)},this.getCurrentViewport=function(b){return b.copy(C)},this.getViewport=function(b){return b.copy(we)},this.setViewport=function(b,D,B,k){b.isVector4?we.set(b.x,b.y,b.z,b.w):we.set(b,D,B,k),be.viewport(C.copy(we).multiplyScalar(V).round())},this.getScissor=function(b){return b.copy(ze)},this.setScissor=function(b,D,B,k){b.isVector4?ze.set(b.x,b.y,b.z,b.w):ze.set(b,D,B,k),be.scissor(H.copy(ze).multiplyScalar(V).round())},this.getScissorTest=function(){return ht},this.setScissorTest=function(b){be.setScissorTest(ht=b)},this.setOpaqueSort=function(b){le=b},this.setTransparentSort=function(b){se=b},this.getClearColor=function(b){return b.copy(Ee.getClearColor())},this.setClearColor=function(){Ee.setClearColor(...arguments)},this.getClearAlpha=function(){return Ee.getClearAlpha()},this.setClearAlpha=function(){Ee.setClearAlpha(...arguments)},this.clear=function(b=!0,D=!0,B=!0){let k=0;if(b){let O=!1;if(L!==null){let ie=L.texture.format;O=ie===ya||ie===va||ie===xa}if(O){let ie=L.texture.type,de=ie===An||ie===Si||ie===Hr||ie===zr||ie===ma||ie===ga,ye=Ee.getClearColor(),ge=Ee.getClearAlpha(),Oe=ye.r,Fe=ye.g,Pe=ye.b;de?(p[0]=Oe,p[1]=Fe,p[2]=Pe,p[3]=ge,N.clearBufferuiv(N.COLOR,0,p)):(_[0]=Oe,_[1]=Fe,_[2]=Pe,_[3]=ge,N.clearBufferiv(N.COLOR,0,_))}else k|=N.COLOR_BUFFER_BIT}D&&(k|=N.DEPTH_BUFFER_BIT),B&&(k|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",oe,!1),t.removeEventListener("webglcontextrestored",me,!1),t.removeEventListener("webglcontextcreationerror",K,!1),Ee.dispose(),X.dispose(),Te.dispose(),pe.dispose(),St.dispose(),yt.dispose(),F.dispose(),ue.dispose(),Ve.dispose(),Y.dispose(),ne.dispose(),ne.removeEventListener("sessionstart",sn),ne.removeEventListener("sessionend",ss),Vn.stop()};function oe(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function me(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;let b=dt.autoReset,D=Me.enabled,B=Me.autoUpdate,k=Me.needsUpdate,O=Me.type;U(),dt.autoReset=b,Me.enabled=D,Me.autoUpdate=B,Me.needsUpdate=k,Me.type=O}function K(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function Z(b){let D=b.target;D.removeEventListener("dispose",Z),xe(D)}function xe(b){He(b),pe.remove(b)}function He(b){let D=pe.get(b).programs;D!==void 0&&(D.forEach(function(B){Y.releaseProgram(B)}),b.isShaderMaterial&&Y.releaseShaderCache(b))}this.renderBufferDirect=function(b,D,B,k,O,ie){D===null&&(D=Be);let de=O.isMesh&&O.matrixWorld.determinant()<0,ye=uh(b,D,B,k,O);be.setMaterial(k,de);let ge=B.index,Oe=1;if(k.wireframe===!0){if(ge=E.getWireframeAttribute(B),ge===void 0)return;Oe=2}let Fe=B.drawRange,Pe=B.attributes.position,$e=Fe.start*Oe,ct=(Fe.start+Fe.count)*Oe;ie!==null&&($e=Math.max($e,ie.start*Oe),ct=Math.min(ct,(ie.start+ie.count)*Oe)),ge!==null?($e=Math.max($e,0),ct=Math.min(ct,ge.count)):Pe!=null&&($e=Math.max($e,0),ct=Math.min(ct,Pe.count));let Mt=ct-$e;if(Mt<0||Mt===1/0)return;ue.setup(O,k,ye,B,ge);let pt,ft=he;if(ge!==null&&(pt=P.get(ge),ft=Ne,ft.setIndex(pt)),O.isMesh)k.wireframe===!0?(be.setLineWidth(k.wireframeLinewidth*Ze()),ft.setMode(N.LINES)):ft.setMode(N.TRIANGLES);else if(O.isLine){let Ue=k.linewidth;Ue===void 0&&(Ue=1),be.setLineWidth(Ue*Ze()),O.isLineSegments?ft.setMode(N.LINES):O.isLineLoop?ft.setMode(N.LINE_LOOP):ft.setMode(N.LINE_STRIP)}else O.isPoints?ft.setMode(N.POINTS):O.isSprite&&ft.setMode(N.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)zi("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ft.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(Re.get("WEBGL_multi_draw"))ft.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{let Ue=O._multiDrawStarts,xt=O._multiDrawCounts,tt=O._multiDrawCount,jt=ge?P.get(ge).bytesPerElement:1,ur=pe.get(k).currentProgram.getUniforms();for(let Kt=0;Kt<tt;Kt++)ur.setValue(N,"_gl_DrawID",Kt),ft.render(Ue[Kt]/jt,xt[Kt])}else if(O.isInstancedMesh)ft.renderInstances($e,Mt,O.count);else if(B.isInstancedBufferGeometry){let Ue=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,xt=Math.min(B.instanceCount,Ue);ft.renderInstances($e,Mt,xt)}else ft.render($e,Mt)};function st(b,D,B){b.transparent===!0&&b.side===Xt&&b.forceSinglePass===!1?(b.side=Ut,b.needsUpdate=!0,Ri(b,D,B),b.side=en,b.needsUpdate=!0,Ri(b,D,B),b.side=Xt):Ri(b,D,B)}this.compile=function(b,D,B=null){B===null&&(B=b),m=Te.get(B),m.init(D),S.push(m),B.traverseVisible(function(O){O.isLight&&O.layers.test(D.layers)&&(m.pushLight(O),O.castShadow&&m.pushShadow(O))}),b!==B&&b.traverseVisible(function(O){O.isLight&&O.layers.test(D.layers)&&(m.pushLight(O),O.castShadow&&m.pushShadow(O))}),m.setupLights();let k=new Set;return b.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;let ie=O.material;if(ie)if(Array.isArray(ie))for(let de=0;de<ie.length;de++){let ye=ie[de];st(ye,B,O),k.add(ye)}else st(ie,B,O),k.add(ie)}),m=S.pop(),k},this.compileAsync=function(b,D,B=null){let k=this.compile(b,D,B);return new Promise(O=>{function ie(){if(k.forEach(function(de){pe.get(de).currentProgram.isReady()&&k.delete(de)}),k.size===0){O(b);return}setTimeout(ie,10)}Re.get("KHR_parallel_shader_compile")!==null?ie():setTimeout(ie,10)})};let et=null;function xn(b){et&&et(b)}function sn(){Vn.stop()}function ss(){Vn.start()}let Vn=new ff;Vn.setAnimationLoop(xn),typeof self<"u"&&Vn.setContext(self),this.setAnimationLoop=function(b){et=b,ne.setAnimationLoop(b),b===null?Vn.stop():Vn.start()},ne.addEventListener("sessionstart",sn),ne.addEventListener("sessionend",ss),this.render=function(b,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),ne.enabled===!0&&ne.isPresenting===!0&&(ne.cameraAutoUpdate===!0&&ne.updateCamera(D),D=ne.getCamera()),b.isScene===!0&&b.onBeforeRender(v,b,D,L),m=Te.get(b,S.length),m.init(D),S.push(m),re.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),rt.setFromProjectionMatrix(re,Sn,D.reversedDepth),ce=this.localClippingEnabled,q=ee.init(this.clippingPlanes,ce),g=X.get(b,y.length),g.init(),y.push(g),ne.enabled===!0&&ne.isPresenting===!0){let ie=v.xr.getDepthSensingMesh();ie!==null&&os(ie,D,-1/0,v.sortObjects)}os(b,D,0,v.sortObjects),g.finish(),v.sortObjects===!0&&g.sort(le,se),_t=ne.enabled===!1||ne.isPresenting===!1||ne.hasDepthSensing()===!1,_t&&Ee.addToRenderList(g,b),this.info.render.frame++,q===!0&&ee.beginShadows();let B=m.state.shadowsArray;Me.render(B,b,D),q===!0&&ee.endShadows(),this.info.autoReset===!0&&this.info.reset();let k=g.opaque,O=g.transmissive;if(m.setupLights(),D.isArrayCamera){let ie=D.cameras;if(O.length>0)for(let de=0,ye=ie.length;de<ye;de++){let ge=ie[de];co(k,O,b,ge)}_t&&Ee.render(b);for(let de=0,ye=ie.length;de<ye;de++){let ge=ie[de];lo(g,b,ge,ge.viewport)}}else O.length>0&&co(k,O,b,D),_t&&Ee.render(b),lo(g,b,D);L!==null&&I===0&&(Ge.updateMultisampleRenderTarget(L),Ge.updateRenderTargetMipmap(L)),b.isScene===!0&&b.onAfterRender(v,b,D),ue.resetDefaultState(),M=-1,T=null,S.pop(),S.length>0?(m=S[S.length-1],q===!0&&ee.setGlobalState(v.clippingPlanes,m.state.camera)):m=null,y.pop(),y.length>0?g=y[y.length-1]:g=null};function os(b,D,B,k){if(b.visible===!1)return;if(b.layers.test(D.layers)){if(b.isGroup)B=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(D);else if(b.isLight)m.pushLight(b),b.castShadow&&m.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||rt.intersectsSprite(b)){k&&Le.setFromMatrixPosition(b.matrixWorld).applyMatrix4(re);let de=F.update(b),ye=b.material;ye.visible&&g.push(b,de,ye,B,Le.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||rt.intersectsObject(b))){let de=F.update(b),ye=b.material;if(k&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Le.copy(b.boundingSphere.center)):(de.boundingSphere===null&&de.computeBoundingSphere(),Le.copy(de.boundingSphere.center)),Le.applyMatrix4(b.matrixWorld).applyMatrix4(re)),Array.isArray(ye)){let ge=de.groups;for(let Oe=0,Fe=ge.length;Oe<Fe;Oe++){let Pe=ge[Oe],$e=ye[Pe.materialIndex];$e&&$e.visible&&g.push(b,de,$e,B,Le.z,Pe)}}else ye.visible&&g.push(b,de,ye,B,Le.z,null)}}let ie=b.children;for(let de=0,ye=ie.length;de<ye;de++)os(ie[de],D,B,k)}function lo(b,D,B,k){let O=b.opaque,ie=b.transmissive,de=b.transparent;m.setupLightsView(B),q===!0&&ee.setGlobalState(v.clippingPlanes,B),k&&be.viewport(C.copy(k)),O.length>0&&ar(O,D,B),ie.length>0&&ar(ie,D,B),de.length>0&&ar(de,D,B),be.buffers.depth.setTest(!0),be.buffers.depth.setMask(!0),be.buffers.color.setMask(!0),be.setPolygonOffset(!1)}function co(b,D,B,k){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[k.id]===void 0&&(m.state.transmissionRenderTarget[k.id]=new In(1,1,{generateMipmaps:!0,type:Re.has("EXT_color_buffer_half_float")||Re.has("EXT_color_buffer_float")?Vr:An,minFilter:wn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:je.workingColorSpace}));let ie=m.state.transmissionRenderTarget[k.id],de=k.viewport||C;ie.setSize(de.z*v.transmissionResolutionScale,de.w*v.transmissionResolutionScale);let ye=v.getRenderTarget(),ge=v.getActiveCubeFace(),Oe=v.getActiveMipmapLevel();v.setRenderTarget(ie),v.getClearColor(G),$=v.getClearAlpha(),$<1&&v.setClearColor(16777215,.5),v.clear(),_t&&Ee.render(B);let Fe=v.toneMapping;v.toneMapping=bn;let Pe=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),m.setupLightsView(k),q===!0&&ee.setGlobalState(v.clippingPlanes,k),ar(b,B,k),Ge.updateMultisampleRenderTarget(ie),Ge.updateRenderTargetMipmap(ie),Re.has("WEBGL_multisampled_render_to_texture")===!1){let $e=!1;for(let ct=0,Mt=D.length;ct<Mt;ct++){let pt=D[ct],ft=pt.object,Ue=pt.geometry,xt=pt.material,tt=pt.group;if(xt.side===Xt&&ft.layers.test(k.layers)){let jt=xt.side;xt.side=Ut,xt.needsUpdate=!0,lr(ft,B,k,Ue,xt,tt),xt.side=jt,xt.needsUpdate=!0,$e=!0}}$e===!0&&(Ge.updateMultisampleRenderTarget(ie),Ge.updateRenderTargetMipmap(ie))}v.setRenderTarget(ye,ge,Oe),v.setClearColor(G,$),Pe!==void 0&&(k.viewport=Pe),v.toneMapping=Fe}function ar(b,D,B){let k=D.isScene===!0?D.overrideMaterial:null;for(let O=0,ie=b.length;O<ie;O++){let de=b[O],ye=de.object,ge=de.geometry,Oe=de.group,Fe=de.material;Fe.allowOverride===!0&&k!==null&&(Fe=k),ye.layers.test(B.layers)&&lr(ye,D,B,ge,Fe,Oe)}}function lr(b,D,B,k,O,ie){b.onBeforeRender(v,D,B,k,O,ie),b.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),O.onBeforeRender(v,D,B,k,b,ie),O.transparent===!0&&O.side===Xt&&O.forceSinglePass===!1?(O.side=Ut,O.needsUpdate=!0,v.renderBufferDirect(B,D,k,O,b,ie),O.side=en,O.needsUpdate=!0,v.renderBufferDirect(B,D,k,O,b,ie),O.side=Xt):v.renderBufferDirect(B,D,k,O,b,ie),b.onAfterRender(v,D,B,k,O,ie)}function Ri(b,D,B){D.isScene!==!0&&(D=Be);let k=pe.get(b),O=m.state.lights,ie=m.state.shadowsArray,de=O.state.version,ye=Y.getParameters(b,O.state,ie,D,B),ge=Y.getProgramCacheKey(ye),Oe=k.programs;k.environment=b.isMeshStandardMaterial?D.environment:null,k.fog=D.fog,k.envMap=(b.isMeshStandardMaterial?yt:St).get(b.envMap||k.environment),k.envMapRotation=k.environment!==null&&b.envMap===null?D.environmentRotation:b.envMapRotation,Oe===void 0&&(b.addEventListener("dispose",Z),Oe=new Map,k.programs=Oe);let Fe=Oe.get(ge);if(Fe!==void 0){if(k.currentProgram===Fe&&k.lightsStateVersion===de)return ho(b,ye),Fe}else ye.uniforms=Y.getUniforms(b),b.onBeforeCompile(ye,v),Fe=Y.acquireProgram(ye,ge),Oe.set(ge,Fe),k.uniforms=ye.uniforms;let Pe=k.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Pe.clippingPlanes=ee.uniform),ho(b,ye),k.needsLights=fo(b),k.lightsStateVersion=de,k.needsLights&&(Pe.ambientLightColor.value=O.state.ambient,Pe.lightProbe.value=O.state.probe,Pe.directionalLights.value=O.state.directional,Pe.directionalLightShadows.value=O.state.directionalShadow,Pe.spotLights.value=O.state.spot,Pe.spotLightShadows.value=O.state.spotShadow,Pe.rectAreaLights.value=O.state.rectArea,Pe.ltc_1.value=O.state.rectAreaLTC1,Pe.ltc_2.value=O.state.rectAreaLTC2,Pe.pointLights.value=O.state.point,Pe.pointLightShadows.value=O.state.pointShadow,Pe.hemisphereLights.value=O.state.hemi,Pe.directionalShadowMap.value=O.state.directionalShadowMap,Pe.directionalShadowMatrix.value=O.state.directionalShadowMatrix,Pe.spotShadowMap.value=O.state.spotShadowMap,Pe.spotLightMatrix.value=O.state.spotLightMatrix,Pe.spotLightMap.value=O.state.spotLightMap,Pe.pointShadowMap.value=O.state.pointShadowMap,Pe.pointShadowMatrix.value=O.state.pointShadowMatrix),k.currentProgram=Fe,k.uniformsList=null,Fe}function uo(b){if(b.uniformsList===null){let D=b.currentProgram.getUniforms();b.uniformsList=Yr.seqWithValue(D.seq,b.uniforms)}return b.uniformsList}function ho(b,D){let B=pe.get(b);B.outputColorSpace=D.outputColorSpace,B.batching=D.batching,B.batchingColor=D.batchingColor,B.instancing=D.instancing,B.instancingColor=D.instancingColor,B.instancingMorph=D.instancingMorph,B.skinning=D.skinning,B.morphTargets=D.morphTargets,B.morphNormals=D.morphNormals,B.morphColors=D.morphColors,B.morphTargetsCount=D.morphTargetsCount,B.numClippingPlanes=D.numClippingPlanes,B.numIntersection=D.numClipIntersection,B.vertexAlphas=D.vertexAlphas,B.vertexTangents=D.vertexTangents,B.toneMapping=D.toneMapping}function uh(b,D,B,k,O){D.isScene!==!0&&(D=Be),Ge.resetTextureUnits();let ie=D.fog,de=k.isMeshStandardMaterial?D.environment:null,ye=L===null?v.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:Nt,ge=(k.isMeshStandardMaterial?yt:St).get(k.envMap||de),Oe=k.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Fe=!!B.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Pe=!!B.morphAttributes.position,$e=!!B.morphAttributes.normal,ct=!!B.morphAttributes.color,Mt=bn;k.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(Mt=v.toneMapping);let pt=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,ft=pt!==void 0?pt.length:0,Ue=pe.get(k),xt=m.state.lights;if(q===!0&&(ce===!0||b!==T)){let Ht=b===T&&k.id===M;ee.setState(k,b,Ht)}let tt=!1;k.version===Ue.__version?(Ue.needsLights&&Ue.lightsStateVersion!==xt.state.version||Ue.outputColorSpace!==ye||O.isBatchedMesh&&Ue.batching===!1||!O.isBatchedMesh&&Ue.batching===!0||O.isBatchedMesh&&Ue.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&Ue.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&Ue.instancing===!1||!O.isInstancedMesh&&Ue.instancing===!0||O.isSkinnedMesh&&Ue.skinning===!1||!O.isSkinnedMesh&&Ue.skinning===!0||O.isInstancedMesh&&Ue.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Ue.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Ue.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Ue.instancingMorph===!1&&O.morphTexture!==null||Ue.envMap!==ge||k.fog===!0&&Ue.fog!==ie||Ue.numClippingPlanes!==void 0&&(Ue.numClippingPlanes!==ee.numPlanes||Ue.numIntersection!==ee.numIntersection)||Ue.vertexAlphas!==Oe||Ue.vertexTangents!==Fe||Ue.morphTargets!==Pe||Ue.morphNormals!==$e||Ue.morphColors!==ct||Ue.toneMapping!==Mt||Ue.morphTargetsCount!==ft)&&(tt=!0):(tt=!0,Ue.__version=k.version);let jt=Ue.currentProgram;tt===!0&&(jt=Ri(k,D,O));let ur=!1,Kt=!1,as=!1,vt=jt.getUniforms(),on=Ue.uniforms;if(be.useProgram(jt.program)&&(ur=!0,Kt=!0,as=!0),k.id!==M&&(M=k.id,Kt=!0),ur||T!==b){be.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),vt.setValue(N,"projectionMatrix",b.projectionMatrix),vt.setValue(N,"viewMatrix",b.matrixWorldInverse);let qt=vt.map.cameraPosition;qt!==void 0&&qt.setValue(N,Ie.setFromMatrixPosition(b.matrixWorld)),Ke.logarithmicDepthBuffer&&vt.setValue(N,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&vt.setValue(N,"isOrthographic",b.isOrthographicCamera===!0),T!==b&&(T=b,Kt=!0,as=!0)}if(O.isSkinnedMesh){vt.setOptional(N,O,"bindMatrix"),vt.setOptional(N,O,"bindMatrixInverse");let Ht=O.skeleton;Ht&&(Ht.boneTexture===null&&Ht.computeBoneTexture(),vt.setValue(N,"boneTexture",Ht.boneTexture,Ge))}O.isBatchedMesh&&(vt.setOptional(N,O,"batchingTexture"),vt.setValue(N,"batchingTexture",O._matricesTexture,Ge),vt.setOptional(N,O,"batchingIdTexture"),vt.setValue(N,"batchingIdTexture",O._indirectTexture,Ge),vt.setOptional(N,O,"batchingColorTexture"),O._colorsTexture!==null&&vt.setValue(N,"batchingColorTexture",O._colorsTexture,Ge));let an=B.morphAttributes;if((an.position!==void 0||an.normal!==void 0||an.color!==void 0)&&te.update(O,B,jt),(Kt||Ue.receiveShadow!==O.receiveShadow)&&(Ue.receiveShadow=O.receiveShadow,vt.setValue(N,"receiveShadow",O.receiveShadow)),k.isMeshGouraudMaterial&&k.envMap!==null&&(on.envMap.value=ge,on.flipEnvMap.value=ge.isCubeTexture&&ge.isRenderTargetTexture===!1?-1:1),k.isMeshStandardMaterial&&k.envMap===null&&D.environment!==null&&(on.envMapIntensity.value=D.environmentIntensity),Kt&&(vt.setValue(N,"toneMappingExposure",v.toneMappingExposure),Ue.needsLights&&Rl(on,as),ie&&k.fog===!0&&j.refreshFogUniforms(on,ie),j.refreshMaterialUniforms(on,k,V,J,m.state.transmissionRenderTarget[b.id]),Yr.upload(N,uo(Ue),on,Ge)),k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(Yr.upload(N,uo(Ue),on,Ge),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&vt.setValue(N,"center",O.center),vt.setValue(N,"modelViewMatrix",O.modelViewMatrix),vt.setValue(N,"normalMatrix",O.normalMatrix),vt.setValue(N,"modelMatrix",O.matrixWorld),k.isShaderMaterial||k.isRawShaderMaterial){let Ht=k.uniformsGroups;for(let qt=0,Il=Ht.length;qt<Il;qt++){let Ci=Ht[qt];Ve.update(Ci,jt),Ve.bind(Ci,jt)}}return jt}function Rl(b,D){b.ambientLightColor.needsUpdate=D,b.lightProbe.needsUpdate=D,b.directionalLights.needsUpdate=D,b.directionalLightShadows.needsUpdate=D,b.pointLights.needsUpdate=D,b.pointLightShadows.needsUpdate=D,b.spotLights.needsUpdate=D,b.spotLightShadows.needsUpdate=D,b.rectAreaLights.needsUpdate=D,b.hemisphereLights.needsUpdate=D}function fo(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return I},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(b,D,B){let k=pe.get(b);k.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,k.__autoAllocateDepthBuffer===!1&&(k.__useRenderToTexture=!1),pe.get(b.texture).__webglTexture=D,pe.get(b.depthTexture).__webglTexture=k.__autoAllocateDepthBuffer?void 0:B,k.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,D){let B=pe.get(b);B.__webglFramebuffer=D,B.__useDefaultFramebuffer=D===void 0};let Cl=N.createFramebuffer();this.setRenderTarget=function(b,D=0,B=0){L=b,R=D,I=B;let k=!0,O=null,ie=!1,de=!1;if(b){let ge=pe.get(b);if(ge.__useDefaultFramebuffer!==void 0)be.bindFramebuffer(N.FRAMEBUFFER,null),k=!1;else if(ge.__webglFramebuffer===void 0)Ge.setupRenderTarget(b);else if(ge.__hasExternalTextures)Ge.rebindTextures(b,pe.get(b.texture).__webglTexture,pe.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){let Pe=b.depthTexture;if(ge.__boundDepthTexture!==Pe){if(Pe!==null&&pe.has(Pe)&&(b.width!==Pe.image.width||b.height!==Pe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ge.setupDepthRenderbuffer(b)}}let Oe=b.texture;(Oe.isData3DTexture||Oe.isDataArrayTexture||Oe.isCompressedArrayTexture)&&(de=!0);let Fe=pe.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Fe[D])?O=Fe[D][B]:O=Fe[D],ie=!0):b.samples>0&&Ge.useMultisampledRTT(b)===!1?O=pe.get(b).__webglMultisampledFramebuffer:Array.isArray(Fe)?O=Fe[B]:O=Fe,C.copy(b.viewport),H.copy(b.scissor),z=b.scissorTest}else C.copy(we).multiplyScalar(V).floor(),H.copy(ze).multiplyScalar(V).floor(),z=ht;if(B!==0&&(O=Cl),be.bindFramebuffer(N.FRAMEBUFFER,O)&&k&&be.drawBuffers(b,O),be.viewport(C),be.scissor(H),be.setScissorTest(z),ie){let ge=pe.get(b.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+D,ge.__webglTexture,B)}else if(de){let ge=D;for(let Oe=0;Oe<b.textures.length;Oe++){let Fe=pe.get(b.textures[Oe]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+Oe,Fe.__webglTexture,B,ge)}}else if(b!==null&&B!==0){let ge=pe.get(b.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,ge.__webglTexture,B)}M=-1},this.readRenderTargetPixels=function(b,D,B,k,O,ie,de,ye=0){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ge=pe.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&de!==void 0&&(ge=ge[de]),ge){be.bindFramebuffer(N.FRAMEBUFFER,ge);try{let Oe=b.textures[ye],Fe=Oe.format,Pe=Oe.type;if(!Ke.textureFormatReadable(Fe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ke.textureTypeReadable(Pe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=b.width-k&&B>=0&&B<=b.height-O&&(b.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+ye),N.readPixels(D,B,k,O,Se.convert(Fe),Se.convert(Pe),ie))}finally{let Oe=L!==null?pe.get(L).__webglFramebuffer:null;be.bindFramebuffer(N.FRAMEBUFFER,Oe)}}},this.readRenderTargetPixelsAsync=async function(b,D,B,k,O,ie,de,ye=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ge=pe.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&de!==void 0&&(ge=ge[de]),ge)if(D>=0&&D<=b.width-k&&B>=0&&B<=b.height-O){be.bindFramebuffer(N.FRAMEBUFFER,ge);let Oe=b.textures[ye],Fe=Oe.format,Pe=Oe.type;if(!Ke.textureFormatReadable(Fe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ke.textureTypeReadable(Pe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let $e=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,$e),N.bufferData(N.PIXEL_PACK_BUFFER,ie.byteLength,N.STREAM_READ),b.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+ye),N.readPixels(D,B,k,O,Se.convert(Fe),Se.convert(Pe),0);let ct=L!==null?pe.get(L).__webglFramebuffer:null;be.bindFramebuffer(N.FRAMEBUFFER,ct);let Mt=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await kd(N,Mt,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,$e),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,ie),N.deleteBuffer($e),N.deleteSync(Mt),ie}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,D=null,B=0){let k=Math.pow(2,-B),O=Math.floor(b.image.width*k),ie=Math.floor(b.image.height*k),de=D!==null?D.x:0,ye=D!==null?D.y:0;Ge.setTexture2D(b,0),N.copyTexSubImage2D(N.TEXTURE_2D,B,0,0,de,ye,O,ie),be.unbindTexture()};let Pl=N.createFramebuffer(),cr=N.createFramebuffer();this.copyTextureToTexture=function(b,D,B=null,k=null,O=0,ie=null){ie===null&&(O!==0?(zi("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ie=O,O=0):ie=0);let de,ye,ge,Oe,Fe,Pe,$e,ct,Mt,pt=b.isCompressedTexture?b.mipmaps[ie]:b.image;if(B!==null)de=B.max.x-B.min.x,ye=B.max.y-B.min.y,ge=B.isBox3?B.max.z-B.min.z:1,Oe=B.min.x,Fe=B.min.y,Pe=B.isBox3?B.min.z:0;else{let an=Math.pow(2,-O);de=Math.floor(pt.width*an),ye=Math.floor(pt.height*an),b.isDataArrayTexture?ge=pt.depth:b.isData3DTexture?ge=Math.floor(pt.depth*an):ge=1,Oe=0,Fe=0,Pe=0}k!==null?($e=k.x,ct=k.y,Mt=k.z):($e=0,ct=0,Mt=0);let ft=Se.convert(D.format),Ue=Se.convert(D.type),xt;D.isData3DTexture?(Ge.setTexture3D(D,0),xt=N.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(Ge.setTexture2DArray(D,0),xt=N.TEXTURE_2D_ARRAY):(Ge.setTexture2D(D,0),xt=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,D.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,D.unpackAlignment);let tt=N.getParameter(N.UNPACK_ROW_LENGTH),jt=N.getParameter(N.UNPACK_IMAGE_HEIGHT),ur=N.getParameter(N.UNPACK_SKIP_PIXELS),Kt=N.getParameter(N.UNPACK_SKIP_ROWS),as=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,pt.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,pt.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Oe),N.pixelStorei(N.UNPACK_SKIP_ROWS,Fe),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Pe);let vt=b.isDataArrayTexture||b.isData3DTexture,on=D.isDataArrayTexture||D.isData3DTexture;if(b.isDepthTexture){let an=pe.get(b),Ht=pe.get(D),qt=pe.get(an.__renderTarget),Il=pe.get(Ht.__renderTarget);be.bindFramebuffer(N.READ_FRAMEBUFFER,qt.__webglFramebuffer),be.bindFramebuffer(N.DRAW_FRAMEBUFFER,Il.__webglFramebuffer);for(let Ci=0;Ci<ge;Ci++)vt&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,pe.get(b).__webglTexture,O,Pe+Ci),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,pe.get(D).__webglTexture,ie,Mt+Ci)),N.blitFramebuffer(Oe,Fe,de,ye,$e,ct,de,ye,N.DEPTH_BUFFER_BIT,N.NEAREST);be.bindFramebuffer(N.READ_FRAMEBUFFER,null),be.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(O!==0||b.isRenderTargetTexture||pe.has(b)){let an=pe.get(b),Ht=pe.get(D);be.bindFramebuffer(N.READ_FRAMEBUFFER,Pl),be.bindFramebuffer(N.DRAW_FRAMEBUFFER,cr);for(let qt=0;qt<ge;qt++)vt?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,an.__webglTexture,O,Pe+qt):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,an.__webglTexture,O),on?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ht.__webglTexture,ie,Mt+qt):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Ht.__webglTexture,ie),O!==0?N.blitFramebuffer(Oe,Fe,de,ye,$e,ct,de,ye,N.COLOR_BUFFER_BIT,N.NEAREST):on?N.copyTexSubImage3D(xt,ie,$e,ct,Mt+qt,Oe,Fe,de,ye):N.copyTexSubImage2D(xt,ie,$e,ct,Oe,Fe,de,ye);be.bindFramebuffer(N.READ_FRAMEBUFFER,null),be.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else on?b.isDataTexture||b.isData3DTexture?N.texSubImage3D(xt,ie,$e,ct,Mt,de,ye,ge,ft,Ue,pt.data):D.isCompressedArrayTexture?N.compressedTexSubImage3D(xt,ie,$e,ct,Mt,de,ye,ge,ft,pt.data):N.texSubImage3D(xt,ie,$e,ct,Mt,de,ye,ge,ft,Ue,pt):b.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,ie,$e,ct,de,ye,ft,Ue,pt.data):b.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,ie,$e,ct,pt.width,pt.height,ft,pt.data):N.texSubImage2D(N.TEXTURE_2D,ie,$e,ct,de,ye,ft,Ue,pt);N.pixelStorei(N.UNPACK_ROW_LENGTH,tt),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,jt),N.pixelStorei(N.UNPACK_SKIP_PIXELS,ur),N.pixelStorei(N.UNPACK_SKIP_ROWS,Kt),N.pixelStorei(N.UNPACK_SKIP_IMAGES,as),ie===0&&D.generateMipmaps&&N.generateMipmap(xt),be.unbindTexture()},this.copyTextureToTexture3D=function(b,D,B=null,k=null,O=0){return zi('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(b,D,B,k,O)},this.initRenderTarget=function(b){pe.get(b).__webglFramebuffer===void 0&&Ge.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?Ge.setTextureCube(b,0):b.isData3DTexture?Ge.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?Ge.setTexture2DArray(b,0):Ge.setTexture2D(b,0),be.unbindTexture()},this.resetState=function(){R=0,I=0,L=null,be.reset(),ue.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Sn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=je._getDrawingBufferColorSpace(e),t.unpackColorSpace=je._getUnpackColorSpace()}};function Qc(i,e){if(e===Rc)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===Wr||e===$s){let t=i.getIndex();if(t===null){let o=[],a=i.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);i.setIndex(o),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}let n=t.count-2,r=[];if(e===Wr)for(let o=1;o<=n;o++)r.push(t.getX(0)),r.push(t.getX(o)),r.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(r.push(t.getX(o)),r.push(t.getX(o+1)),r.push(t.getX(o+2))):(r.push(t.getX(o+2)),r.push(t.getX(o+1)),r.push(t.getX(o)));r.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let s=i.clone();return s.setIndex(r),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}var rl=class extends Nn{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new ou(t)}),this.register(function(t){return new au(t)}),this.register(function(t){return new gu(t)}),this.register(function(t){return new _u(t)}),this.register(function(t){return new xu(t)}),this.register(function(t){return new cu(t)}),this.register(function(t){return new uu(t)}),this.register(function(t){return new hu(t)}),this.register(function(t){return new du(t)}),this.register(function(t){return new su(t)}),this.register(function(t){return new fu(t)}),this.register(function(t){return new lu(t)}),this.register(function(t){return new mu(t)}),this.register(function(t){return new pu(t)}),this.register(function(t){return new iu(t)}),this.register(function(t){return new vu(t)}),this.register(function(t){return new yu(t)})}load(e,t,n,r){let s=this,o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){let c=ri.extractUrlBase(e);o=ri.resolveURL(c,this.path)}else o=ri.extractUrlBase(e);this.manager.itemStart(e);let a=function(c){r?r(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new Fr(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,o,function(u){t(u),s.manager.itemEnd(e)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,r){let s,o={},a={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Ef){try{o[Ye.KHR_BINARY_GLTF]=new Mu(e)}catch(h){r&&r(h);return}s=JSON.parse(o[Ye.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){r&&r(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let c=new Ru(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){let h=this.pluginCallbacks[u](c);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[h.name]=h,o[h.name]=!0}if(s.extensionsUsed)for(let u=0;u<s.extensionsUsed.length;++u){let h=s.extensionsUsed[u],d=s.extensionsRequired||[];switch(h){case Ye.KHR_MATERIALS_UNLIT:o[h]=new ru;break;case Ye.KHR_DRACO_MESH_COMPRESSION:o[h]=new Eu(s,this.dracoLoader);break;case Ye.KHR_TEXTURE_TRANSFORM:o[h]=new Su;break;case Ye.KHR_MESH_QUANTIZATION:o[h]=new Tu;break;default:d.indexOf(h)>=0&&a[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,r)}parseAsync(e,t){let n=this;return new Promise(function(r,s){n.parse(e,t,r,s)})}};function ay(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}var Ye={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},iu=class{constructor(e){this.parser=e,this.name=Ye.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,r=t.length;n<r;n++){let s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,r=t.cache.get(n);if(r)return r;let s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e],c,u=new fe(16777215);l.color!==void 0&&u.setRGB(l.color[0],l.color[1],l.color[2],Nt);let h=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Ei(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Os(u),c.distance=h;break;case"spot":c=new Ds(u),c.distance=h,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),li(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),r=Promise.resolve(c),t.cache.add(n,r),r}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,s=n.json.nodes[e],a=(s.extensions&&s.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}},ru=class{constructor(){this.name=Ye.KHR_MATERIALS_UNLIT}getMaterialType(){return Bt}extendParams(e,t,n){let r=[];e.color=new fe(1,1,1),e.opacity=1;let s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){let o=s.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Nt),e.opacity=o[3]}s.baseColorTexture!==void 0&&r.push(n.assignTexture(e,"map",s.baseColorTexture,Tt))}return Promise.all(r)}},su=class{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=r.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}},ou=class{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zt}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],o=r.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){let a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Ae(a,a)}return Promise.all(s)}},au=class{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_DISPERSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zt}extendMaterialParams(e,t){let r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=r.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}},lu=class{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zt}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],o=r.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(s)}},cu=class{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zt}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[];t.sheenColor=new fe(0,0,0),t.sheenRoughness=0,t.sheen=1;let o=r.extensions[this.name];if(o.sheenColorFactor!==void 0){let a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Nt)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,Tt)),o.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(s)}},uu=class{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zt}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],o=r.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(s)}},hu=class{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zt}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],o=r.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;let a=o.attenuationColor||[1,1,1];return t.attenuationColor=new fe().setRGB(a[0],a[1],a[2],Nt),Promise.all(s)}},du=class{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zt}extendMaterialParams(e,t){let r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=r.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}},fu=class{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zt}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],o=r.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));let a=o.specularColorFactor||[1,1,1];return t.specularColor=new fe().setRGB(a[0],a[1],a[2],Nt),o.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,Tt)),Promise.all(s)}},pu=class{constructor(e){this.parser=e,this.name=Ye.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zt}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],o=r.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(s)}},mu=class{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zt}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],o=r.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(s)}},gu=class{constructor(e){this.parser=e,this.name=Ye.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,r=n.textures[e];if(!r.extensions||!r.extensions[this.name])return null;let s=r.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,o)}},_u=class{constructor(e){this.parser=e,this.name=Ye.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,r=n.json,s=r.textures[e];if(!s.extensions||!s.extensions[t])return null;let o=s.extensions[t],a=r.images[o.source],l=n.textureLoader;if(a.uri){let c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,o.source,l)}},xu=class{constructor(e){this.parser=e,this.name=Ye.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,r=n.json,s=r.textures[e];if(!s.extensions||!s.extensions[t])return null;let o=s.extensions[t],a=r.images[o.source],l=n.textureLoader;if(a.uri){let c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,o.source,l)}},vu=class{constructor(e){this.name=Ye.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let r=n.extensions[this.name],s=this.parser.getDependency("buffer",r.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(a){let l=r.byteOffset||0,c=r.byteLength||0,u=r.count,h=r.byteStride,d=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,h,d,r.mode,r.filter).then(function(f){return f.buffer}):o.ready.then(function(){let f=new ArrayBuffer(u*h);return o.decodeGltfBuffer(new Uint8Array(f),u,h,d,r.mode,r.filter),f})})}else return null}},yu=class{constructor(e){this.name=Ye.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let r=t.meshes[n.mesh];for(let c of r.primitives)if(c.mode!==pn.TRIANGLES&&c.mode!==pn.TRIANGLE_STRIP&&c.mode!==pn.TRIANGLE_FAN&&c.mode!==void 0)return null;let o=n.extensions[this.name].attributes,a=[],l={};for(let c in o)a.push(this.parser.getDependency("accessor",o[c]).then(u=>(l[c]=u,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{let u=c.pop(),h=u.isGroup?u.children:[u],d=c[0].count,f=[];for(let p of h){let _=new ve,g=new w,m=new Q,y=new w(1,1,1),S=new As(p.geometry,p.material,d);for(let v=0;v<d;v++)l.TRANSLATION&&g.fromBufferAttribute(l.TRANSLATION,v),l.ROTATION&&m.fromBufferAttribute(l.ROTATION,v),l.SCALE&&y.fromBufferAttribute(l.SCALE,v),S.setMatrixAt(v,_.compose(g,m,y));for(let v in l)if(v==="_COLOR_0"){let A=l[v];S.instanceColor=new Mi(A.array,A.itemSize,A.normalized)}else v!=="TRANSLATION"&&v!=="ROTATION"&&v!=="SCALE"&&p.geometry.setAttribute(v,l[v]);Qe.prototype.copy.call(S,p),this.parser.assignFinalMaterial(S),f.push(S)}return u.isGroup?(u.clear(),u.add(...f),u):f[0]}))}},Ef="glTF",Js=12,xf={JSON:1313821514,BIN:5130562},Mu=class{constructor(e){this.name=Ye.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,Js),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Ef)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let r=this.header.length-Js,s=new DataView(e,Js),o=0;for(;o<r;){let a=s.getUint32(o,!0);o+=4;let l=s.getUint32(o,!0);if(o+=4,l===xf.JSON){let c=new Uint8Array(e,Js+o,a);this.content=n.decode(c)}else if(l===xf.BIN){let c=Js+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},Eu=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Ye.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,r=this.dracoLoader,s=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(let u in o){let h=wu[u]||u.toLowerCase();a[h]=o[u]}for(let u in e.attributes){let h=wu[u]||u.toLowerCase();if(o[u]!==void 0){let d=n.accessors[e.attributes[u]],f=jr[d.componentType];c[h]=f.name,l[h]=d.normalized===!0}}return t.getDependency("bufferView",s).then(function(u){return new Promise(function(h,d){r.decodeDracoFile(u,function(f){for(let p in f.attributes){let _=f.attributes[p],g=l[p];g!==void 0&&(_.normalized=g)}h(f)},a,c,Nt,d)})})}},Su=class{constructor(){this.name=Ye.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},Tu=class{constructor(){this.name=Ye.KHR_MESH_QUANTIZATION}},sl=class extends Qn{constructor(e,t,n,r){super(e,t,n,r)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r*3+r;for(let o=0;o!==r;o++)t[o]=n[s+o];return t}interpolate_(e,t,n,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,u=r-t,h=(n-t)/u,d=h*h,f=d*h,p=e*c,_=p-c,g=-2*f+3*d,m=f-d,y=1-g,S=m-d+h;for(let v=0;v!==a;v++){let A=o[_+v+a],R=o[_+v+l]*u,I=o[p+v+a],L=o[p+v]*u;s[v]=y*A+S*R+g*I+m*L}return s}},ly=new Q,bu=class extends sl{interpolate_(e,t,n,r){let s=super.interpolate_(e,t,n,r);return ly.fromArray(s).normalize().toArray(s),s}},pn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},jr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},vf={9728:Lt,9729:Gt,9984:fa,9985:kr,9986:Zi,9987:wn},yf={33071:Cn,33648:wr,10497:vi},eu={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},wu={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Ti={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},cy={CUBICSPLINE:void 0,LINEAR:Hi,STEP:ki},tu={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function uy(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new Wi({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:en})),i.DefaultMaterial}function er(i,e,t){for(let n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function li(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function hy(i,e,t){let n=!1,r=!1,s=!1;for(let c=0,u=e.length;c<u;c++){let h=e[c];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(r=!0),h.COLOR_0!==void 0&&(s=!0),n&&r&&s)break}if(!n&&!r&&!s)return Promise.resolve(i);let o=[],a=[],l=[];for(let c=0,u=e.length;c<u;c++){let h=e[c];if(n){let d=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):i.attributes.position;o.push(d)}if(r){let d=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):i.attributes.normal;a.push(d)}if(s){let d=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):i.attributes.color;l.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){let u=c[0],h=c[1],d=c[2];return n&&(i.morphAttributes.position=u),r&&(i.morphAttributes.normal=h),s&&(i.morphAttributes.color=d),i.morphTargetsRelative=!0,i})}function dy(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,r=t.length;n<r;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function fy(i){let e,t=i.extensions&&i.extensions[Ye.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+nu(t.attributes):e=i.indices+":"+nu(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,r=i.targets.length;n<r;n++)e+=":"+nu(i.targets[n]);return e}function nu(i){let e="",t=Object.keys(i).sort();for(let n=0,r=t.length;n<r;n++)e+=t[n]+":"+i[t[n]]+";";return e}function Au(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function py(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var my=new ve,Ru=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new ay,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,r=-1,s=!1,o=-1;if(typeof navigator<"u"){let a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;let l=a.match(/Version\/(\d+)/);r=n&&l?parseInt(l[1],10):-1,s=a.indexOf("Firefox")>-1,o=s?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&r<17||s&&o<98?this.textureLoader=new Ns(this.options.manager):this.textureLoader=new Bs(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Fr(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,r=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){let a={scene:o[0][r.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:r.asset,parser:n,userData:{}};return er(s,a,r),li(a,r),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(let l of a.scenes)l.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let r=0,s=t.length;r<s;r++){let o=t[r].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let r=0,s=e.length;r<s;r++){let o=e[r];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let r=n.clone(),s=(o,a)=>{let l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(let[c,u]of o.children.entries())s(u,a.children[c])};return s(n,r),r.name+="_instance_"+e.uses[t]++,r}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let r=e(t[n]);if(r)return r}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let r=0;r<t.length;r++){let s=e(t[r]);s&&n.push(s)}return n}getDependency(e,t){let n=e+":"+t,r=this.cache.get(n);if(!r){switch(e){case"scene":r=this.loadScene(t);break;case"node":r=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":r=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":r=this.loadAccessor(t);break;case"bufferView":r=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":r=this.loadBuffer(t);break;case"material":r=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":r=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":r=this.loadSkin(t);break;case"animation":r=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":r=this.loadCamera(t);break;default:if(r=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!r)throw new Error("Unknown type: "+e);break}this.cache.add(n,r)}return r}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,r=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(r.map(function(s,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Ye.KHR_BINARY_GLTF].body);let r=this.options;return new Promise(function(s,o){n.load(ri.resolveURL(t.uri,r.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let r=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+r)})}loadAccessor(e){let t=this,n=this.json,r=this.json.accessors[e];if(r.bufferView===void 0&&r.sparse===void 0){let o=eu[r.type],a=jr[r.componentType],l=r.normalized===!0,c=new a(r.count*o);return Promise.resolve(new ke(c,o,l))}let s=[];return r.bufferView!==void 0?s.push(this.getDependency("bufferView",r.bufferView)):s.push(null),r.sparse!==void 0&&(s.push(this.getDependency("bufferView",r.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",r.sparse.values.bufferView))),Promise.all(s).then(function(o){let a=o[0],l=eu[r.type],c=jr[r.componentType],u=c.BYTES_PER_ELEMENT,h=u*l,d=r.byteOffset||0,f=r.bufferView!==void 0?n.bufferViews[r.bufferView].byteStride:void 0,p=r.normalized===!0,_,g;if(f&&f!==h){let m=Math.floor(d/f),y="InterleavedBuffer:"+r.bufferView+":"+r.componentType+":"+m+":"+r.count,S=t.cache.get(y);S||(_=new c(a,m*f,r.count*f/u),S=new $n(_,f/u),t.cache.add(y,S)),g=new jn(S,l,d%f/u,p)}else a===null?_=new c(r.count*l):_=new c(a,d,r.count*l),g=new ke(_,l,p);if(r.sparse!==void 0){let m=eu.SCALAR,y=jr[r.sparse.indices.componentType],S=r.sparse.indices.byteOffset||0,v=r.sparse.values.byteOffset||0,A=new y(o[1],S,r.sparse.count*m),R=new c(o[2],v,r.sparse.count*l);a!==null&&(g=new ke(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let I=0,L=A.length;I<L;I++){let M=A[I];if(g.setX(M,R[I*l]),l>=2&&g.setY(M,R[I*l+1]),l>=3&&g.setZ(M,R[I*l+2]),l>=4&&g.setW(M,R[I*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=p}return g})}loadTexture(e){let t=this.json,n=this.options,s=t.textures[e].source,o=t.images[s],a=this.textureLoader;if(o.uri){let l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,s,a)}loadTextureImage(e,t,n){let r=this,s=this.json,o=s.textures[e],a=s.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];let c=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);let d=(s.samplers||{})[o.sampler]||{};return u.magFilter=vf[d.magFilter]||Gt,u.minFilter=vf[d.minFilter]||wn,u.wrapS=yf[d.wrapS]||vi,u.wrapT=yf[d.wrapT]||vi,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==Lt&&u.minFilter!==Gt,r.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){let n=this,r=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());let o=r.images[e],a=self.URL||self.webkitURL,l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(h){c=!0;let d=new Blob([h],{type:o.mimeType});return l=a.createObjectURL(d),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let u=Promise.resolve(l).then(function(h){return new Promise(function(d,f){let p=d;t.isImageBitmapLoader===!0&&(p=function(_){let g=new Pt(_);g.needsUpdate=!0,d(g)}),t.load(ri.resolveURL(h,s.path),p,void 0,f)})}).then(function(h){return c===!0&&a.revokeObjectURL(l),li(h,o),h.userData.mimeType=o.mimeType||py(o.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),h});return this.sourceCache[e]=u,u}assignTexture(e,t,n,r){let s=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),s.extensions[Ye.KHR_TEXTURE_TRANSFORM]){let a=n.extensions!==void 0?n.extensions[Ye.KHR_TEXTURE_TRANSFORM]:void 0;if(a){let l=s.associations.get(o);o=s.extensions[Ye.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),s.associations.set(o,l)}}return r!==void 0&&(o.colorSpace=r),e[t]=o,o})}assignFinalMaterial(e){let t=e.geometry,n=e.material,r=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){let a="PointsMaterial:"+n.uuid,l=this.cache.get(a);l||(l=new Or,Ft.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){let a="LineBasicMaterial:"+n.uuid,l=this.cache.get(a);l||(l=new Wt,Ft.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(r||s||o){let a="ClonedMaterial:"+n.uuid+":";r&&(a+="derivative-tangents:"),s&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),s&&(l.vertexColors=!0),o&&(l.flatShading=!0),r&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return Wi}loadMaterial(e){let t=this,n=this.json,r=this.extensions,s=n.materials[e],o,a={},l=s.extensions||{},c=[];if(l[Ye.KHR_MATERIALS_UNLIT]){let h=r[Ye.KHR_MATERIALS_UNLIT];o=h.getMaterialType(),c.push(h.extendParams(a,s,t))}else{let h=s.pbrMetallicRoughness||{};if(a.color=new fe(1,1,1),a.opacity=1,Array.isArray(h.baseColorFactor)){let d=h.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],Nt),a.opacity=d[3]}h.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",h.baseColorTexture,Tt)),a.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,a.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",h.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",h.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}s.doubleSided===!0&&(a.side=Xt);let u=s.alphaMode||tu.OPAQUE;if(u===tu.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===tu.MASK&&(a.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==Bt&&(c.push(t.assignTexture(a,"normalMap",s.normalTexture)),a.normalScale=new Ae(1,1),s.normalTexture.scale!==void 0)){let h=s.normalTexture.scale;a.normalScale.set(h,h)}if(s.occlusionTexture!==void 0&&o!==Bt&&(c.push(t.assignTexture(a,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==Bt){let h=s.emissiveFactor;a.emissive=new fe().setRGB(h[0],h[1],h[2],Nt)}return s.emissiveTexture!==void 0&&o!==Bt&&c.push(t.assignTexture(a,"emissiveMap",s.emissiveTexture,Tt)),Promise.all(c).then(function(){let h=new o(a);return s.name&&(h.name=s.name),li(h,s),t.associations.set(h,{materials:e}),s.extensions&&er(r,h,s),h})}createUniqueName(e){let t=ut.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,r=this.primitiveCache;function s(a){return n[Ye.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return Mf(l,a,t)})}let o=[];for(let a=0,l=e.length;a<l;a++){let c=e[a],u=fy(c),h=r[u];if(h)o.push(h.promise);else{let d;c.extensions&&c.extensions[Ye.KHR_DRACO_MESH_COMPRESSION]?d=s(c):d=Mf(new nt,c,t),r[u]={primitive:c,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(e){let t=this,n=this.json,r=this.extensions,s=n.meshes[e],o=s.primitives,a=[];for(let l=0,c=o.length;l<c;l++){let u=o[l].material===void 0?uy(this.cache):this.getDependency("material",o[l].material);a.push(u)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){let c=l.slice(0,l.length-1),u=l[l.length-1],h=[];for(let f=0,p=u.length;f<p;f++){let _=u[f],g=o[f],m,y=c[f];if(g.mode===pn.TRIANGLES||g.mode===pn.TRIANGLE_STRIP||g.mode===pn.TRIANGLE_FAN||g.mode===void 0)m=s.isSkinnedMesh===!0?new Kn(_,y):new Et(_,y),m.isSkinnedMesh===!0&&m.normalizeSkinWeights(),g.mode===pn.TRIANGLE_STRIP?m.geometry=Qc(m.geometry,$s):g.mode===pn.TRIANGLE_FAN&&(m.geometry=Qc(m.geometry,Wr));else if(g.mode===pn.LINES)m=new un(_,y);else if(g.mode===pn.LINE_STRIP)m=new Jn(_,y);else if(g.mode===pn.LINE_LOOP)m=new Rs(_,y);else if(g.mode===pn.POINTS)m=new Cs(_,y);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(m.geometry.morphAttributes).length>0&&dy(m,s),m.name=t.createUniqueName(s.name||"mesh_"+e),li(m,s),g.extensions&&er(r,m,g),t.assignFinalMaterial(m),h.push(m)}for(let f=0,p=h.length;f<p;f++)t.associations.set(h[f],{meshes:e,primitives:f});if(h.length===1)return s.extensions&&er(r,h[0],s),h[0];let d=new mt;s.extensions&&er(r,d,s),t.associations.set(d,{meshes:e});for(let f=0,p=h.length;f<p;f++)d.add(h[f]);return d})}loadCamera(e){let t,n=this.json.cameras[e],r=n[n.type];if(!r){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new wt(De.radToDeg(r.yfov),r.aspectRatio||1,r.znear||1,r.zfar||2e6):n.type==="orthographic"&&(t=new ii(-r.xmag,r.xmag,r.ymag,-r.ymag,r.znear,r.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),li(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let r=0,s=t.joints.length;r<s;r++)n.push(this._loadNodeShallow(t.joints[r]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(r){let s=r.pop(),o=r,a=[],l=[];for(let c=0,u=o.length;c<u;c++){let h=o[c];if(h){a.push(h);let d=new ve;s!==null&&d.fromArray(s.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new nn(a,l)})}loadAnimation(e){let t=this.json,n=this,r=t.animations[e],s=r.name?r.name:"animation_"+e,o=[],a=[],l=[],c=[],u=[];for(let h=0,d=r.channels.length;h<d;h++){let f=r.channels[h],p=r.samplers[f.sampler],_=f.target,g=_.node,m=r.parameters!==void 0?r.parameters[p.input]:p.input,y=r.parameters!==void 0?r.parameters[p.output]:p.output;_.node!==void 0&&(o.push(this.getDependency("node",g)),a.push(this.getDependency("accessor",m)),l.push(this.getDependency("accessor",y)),c.push(p),u.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(u)]).then(function(h){let d=h[0],f=h[1],p=h[2],_=h[3],g=h[4],m=[];for(let y=0,S=d.length;y<S;y++){let v=d[y],A=f[y],R=p[y],I=_[y],L=g[y];if(v===void 0)continue;v.updateMatrix&&v.updateMatrix();let M=n._createAnimationTracks(v,A,R,I,L);if(M)for(let T=0;T<M.length;T++)m.push(M[T])}return new ni(s,void 0,m)})}createNodeMesh(e){let t=this.json,n=this,r=t.nodes[e];return r.mesh===void 0?null:n.getDependency("mesh",r.mesh).then(function(s){let o=n._getNodeRef(n.meshCache,r.mesh,s);return r.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=r.weights.length;l<c;l++)a.morphTargetInfluences[l]=r.weights[l]}),o})}loadNode(e){let t=this.json,n=this,r=t.nodes[e],s=n._loadNodeShallow(e),o=[],a=r.children||[];for(let c=0,u=a.length;c<u;c++)o.push(n.getDependency("node",a[c]));let l=r.skin===void 0?Promise.resolve(null):n.getDependency("skin",r.skin);return Promise.all([s,Promise.all(o),l]).then(function(c){let u=c[0],h=c[1],d=c[2];d!==null&&u.traverse(function(f){f.isSkinnedMesh&&f.bind(d,my)});for(let f=0,p=h.length;f<p;f++)u.add(h[f]);return u})}_loadNodeShallow(e){let t=this.json,n=this.extensions,r=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let s=t.nodes[e],o=s.name?r.createUniqueName(s.name):"",a=[],l=r._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),s.camera!==void 0&&a.push(r.getDependency("camera",s.camera).then(function(c){return r._getNodeRef(r.cameraCache,s.camera,c)})),r._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let u;if(s.isBone===!0?u=new Ur:c.length>1?u=new mt:c.length===1?u=c[0]:u=new Qe,u!==c[0])for(let h=0,d=c.length;h<d;h++)u.add(c[h]);if(s.name&&(u.userData.name=s.name,u.name=o),li(u,s),s.extensions&&er(n,u,s),s.matrix!==void 0){let h=new ve;h.fromArray(s.matrix),u.applyMatrix4(h)}else s.translation!==void 0&&u.position.fromArray(s.translation),s.rotation!==void 0&&u.quaternion.fromArray(s.rotation),s.scale!==void 0&&u.scale.fromArray(s.scale);if(!r.associations.has(u))r.associations.set(u,{});else if(s.mesh!==void 0&&r.meshCache.refs[s.mesh]>1){let h=r.associations.get(u);r.associations.set(u,{...h})}return r.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],r=this,s=new mt;n.name&&(s.name=r.createUniqueName(n.name)),li(s,n),n.extensions&&er(t,s,n);let o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(r.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let u=0,h=l.length;u<h;u++)s.add(l[u]);let c=u=>{let h=new Map;for(let[d,f]of r.associations)(d instanceof Ft||d instanceof Pt)&&h.set(d,f);return u.traverse(d=>{let f=r.associations.get(d);f!=null&&h.set(d,f)}),h};return r.associations=c(s),s})}_createAnimationTracks(e,t,n,r,s){let o=[],a=e.name?e.name:e.uuid,l=[];Ti[s.path]===Ti.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(a);let c;switch(Ti[s.path]){case Ti.weights:c=hn;break;case Ti.rotation:c=dn;break;case Ti.translation:case Ti.scale:c=Ln;break;default:switch(n.itemSize){case 1:c=hn;break;case 2:case 3:default:c=Ln;break}break}let u=r.interpolation!==void 0?cy[r.interpolation]:Hi,h=this._getArrayFromAccessor(n);for(let d=0,f=l.length;d<f;d++){let p=new c(l[d]+"."+Ti[s.path],t.array,h,u);r.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(p),o.push(p)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=Au(t.constructor),r=new Float32Array(t.length);for(let s=0,o=t.length;s<o;s++)r[s]=t[s]*n;t=r}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let r=this instanceof dn?bu:sl;return new r(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function gy(i,e,t){let n=e.attributes,r=new It;if(n.POSITION!==void 0){let a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(r.set(new w(l[0],l[1],l[2]),new w(c[0],c[1],c[2])),a.normalized){let u=Au(jr[a.componentType]);r.min.multiplyScalar(u),r.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let s=e.targets;if(s!==void 0){let a=new w,l=new w;for(let c=0,u=s.length;c<u;c++){let h=s[c];if(h.POSITION!==void 0){let d=t.json.accessors[h.POSITION],f=d.min,p=d.max;if(f!==void 0&&p!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(p[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(p[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(p[2]))),d.normalized){let _=Au(jr[d.componentType]);l.multiplyScalar(_)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}r.expandByVector(a)}i.boundingBox=r;let o=new Yt;r.getCenter(o.center),o.radius=r.min.distanceTo(r.max)/2,i.boundingSphere=o}function Mf(i,e,t){let n=e.attributes,r=[];function s(o,a){return t.getDependency("accessor",o).then(function(l){i.setAttribute(a,l)})}for(let o in n){let a=wu[o]||o.toLowerCase();a in i.attributes||r.push(s(n[o],a))}if(e.indices!==void 0&&!i.index){let o=t.getDependency("accessor",e.indices).then(function(a){i.setIndex(a)});r.push(o)}return je.workingColorSpace!==Nt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${je.workingColorSpace}" not supported.`),li(i,e),gy(i,e,t),Promise.all(r).then(function(){return e.targets!==void 0?hy(i,e.targets,t):i})}var ol=(i,e,t)=>new Promise((n,r)=>{var s=l=>{try{a(t.next(l))}catch(c){r(c)}},o=l=>{try{a(t.throw(l))}catch(c){r(c)}},a=l=>l.done?n(l.value):Promise.resolve(l.value).then(s,o);a((t=t.apply(i,e)).next())}),it=(i,e,t)=>new Promise((n,r)=>{var s=l=>{try{a(t.next(l))}catch(c){r(c)}},o=l=>{try{a(t.throw(l))}catch(c){r(c)}},a=l=>l.done?n(l.value):Promise.resolve(l.value).then(s,o);a((t=t.apply(i,e)).next())}),Sf=class extends Qe{constructor(i){super(),this.weight=0,this.isBinary=!1,this.overrideBlink="none",this.overrideLookAt="none",this.overrideMouth="none",this._binds=[],this.name=`VRMExpression_${i}`,this.expressionName=i,this.type="VRMExpression",this.visible=!1}get binds(){return this._binds}get overrideBlinkAmount(){return this.overrideBlink==="block"?0<this.outputWeight?1:0:this.overrideBlink==="blend"?this.outputWeight:0}get overrideLookAtAmount(){return this.overrideLookAt==="block"?0<this.outputWeight?1:0:this.overrideLookAt==="blend"?this.outputWeight:0}get overrideMouthAmount(){return this.overrideMouth==="block"?0<this.outputWeight?1:0:this.overrideMouth==="blend"?this.outputWeight:0}get outputWeight(){return this.isBinary?this.weight>.5?1:0:this.weight}addBind(i){this._binds.push(i)}deleteBind(i){let e=this._binds.indexOf(i);e>=0&&this._binds.splice(e,1)}applyWeight(i){var e;let t=this.outputWeight;t*=(e=i==null?void 0:i.multiplier)!=null?e:1,this.isBinary&&t<1&&(t=0),this._binds.forEach(n=>n.applyWeight(t))}clearAppliedWeight(){this._binds.forEach(i=>i.clearAppliedWeight())}};function sp(i,e,t){var n,r;let s=i.parser.json,o=(n=s.nodes)==null?void 0:n[e];if(o==null)return console.warn(`extractPrimitivesInternal: Attempt to use nodes[${e}] of glTF but the node doesn't exist`),null;let a=o.mesh;if(a==null)return null;let l=(r=s.meshes)==null?void 0:r[a];if(l==null)return console.warn(`extractPrimitivesInternal: Attempt to use meshes[${a}] of glTF but the mesh doesn't exist`),null;let c=l.primitives.length,u=[];return t.traverse(h=>{u.length<c&&h.isMesh&&u.push(h)}),u}function Tf(i,e){return it(this,null,function*(){let t=yield i.parser.getDependency("node",e);return sp(i,e,t)})}function bf(i){return it(this,null,function*(){let e=yield i.parser.getDependencies("node"),t=new Map;return e.forEach((n,r)=>{let s=sp(i,r,n);s!=null&&t.set(r,s)}),t})}var Vu={Aa:"aa",Ih:"ih",Ou:"ou",Ee:"ee",Oh:"oh",Blink:"blink",Happy:"happy",Angry:"angry",Sad:"sad",Relaxed:"relaxed",LookUp:"lookUp",Surprised:"surprised",LookDown:"lookDown",LookLeft:"lookLeft",LookRight:"lookRight",BlinkLeft:"blinkLeft",BlinkRight:"blinkRight",Neutral:"neutral"};function op(i){return Math.max(Math.min(i,1),0)}var wf=class ap{constructor(){this.blinkExpressionNames=["blink","blinkLeft","blinkRight"],this.lookAtExpressionNames=["lookLeft","lookRight","lookUp","lookDown"],this.mouthExpressionNames=["aa","ee","ih","oh","ou"],this._expressions=[],this._expressionMap={}}get expressions(){return this._expressions.concat()}get expressionMap(){return Object.assign({},this._expressionMap)}get presetExpressionMap(){let e={},t=new Set(Object.values(Vu));return Object.entries(this._expressionMap).forEach(([n,r])=>{t.has(n)&&(e[n]=r)}),e}get customExpressionMap(){let e={},t=new Set(Object.values(Vu));return Object.entries(this._expressionMap).forEach(([n,r])=>{t.has(n)||(e[n]=r)}),e}copy(e){return this._expressions.concat().forEach(n=>{this.unregisterExpression(n)}),e._expressions.forEach(n=>{this.registerExpression(n)}),this.blinkExpressionNames=e.blinkExpressionNames.concat(),this.lookAtExpressionNames=e.lookAtExpressionNames.concat(),this.mouthExpressionNames=e.mouthExpressionNames.concat(),this}clone(){return new ap().copy(this)}getExpression(e){var t;return(t=this._expressionMap[e])!=null?t:null}registerExpression(e){this._expressions.push(e),this._expressionMap[e.expressionName]=e}unregisterExpression(e){let t=this._expressions.indexOf(e);t===-1&&console.warn("VRMExpressionManager: The specified expressions is not registered"),this._expressions.splice(t,1),delete this._expressionMap[e.expressionName]}getValue(e){var t;let n=this.getExpression(e);return(t=n==null?void 0:n.weight)!=null?t:null}setValue(e,t){let n=this.getExpression(e);n&&(n.weight=op(t))}resetValues(){this._expressions.forEach(e=>{e.weight=0})}getExpressionTrackName(e){let t=this.getExpression(e);return t?`${t.name}.weight`:null}update(){let e=this._calculateWeightMultipliers();this._expressions.forEach(t=>{t.clearAppliedWeight()}),this._expressions.forEach(t=>{let n=1,r=t.expressionName;this.blinkExpressionNames.indexOf(r)!==-1&&(n*=e.blink),this.lookAtExpressionNames.indexOf(r)!==-1&&(n*=e.lookAt),this.mouthExpressionNames.indexOf(r)!==-1&&(n*=e.mouth),t.applyWeight({multiplier:n})})}_calculateWeightMultipliers(){let e=1,t=1,n=1;return this._expressions.forEach(r=>{e-=r.overrideBlinkAmount,t-=r.overrideLookAtAmount,n-=r.overrideMouthAmount}),e=Math.max(0,e),t=Math.max(0,t),n=Math.max(0,n),{blink:e,lookAt:t,mouth:n}}},Qs={Color:"color",EmissionColor:"emissionColor",ShadeColor:"shadeColor",MatcapColor:"matcapColor",RimColor:"rimColor",OutlineColor:"outlineColor"},_y={_Color:Qs.Color,_EmissionColor:Qs.EmissionColor,_ShadeColor:Qs.ShadeColor,_RimColor:Qs.RimColor,_OutlineColor:Qs.OutlineColor},xy=new fe,lp=class cp{constructor({material:e,type:t,targetValue:n,targetAlpha:r}){this.material=e,this.type=t,this.targetValue=n,this.targetAlpha=r!=null?r:1;let s=this._initColorBindState(),o=this._initAlphaBindState();this._state={color:s,alpha:o}}applyWeight(e){let{color:t,alpha:n}=this._state;if(t!=null){let{propertyName:r,deltaValue:s}=t,o=this.material[r];o!=null&&o.add(xy.copy(s).multiplyScalar(e))}if(n!=null){let{propertyName:r,deltaValue:s}=n;this.material[r]!=null&&(this.material[r]+=s*e)}}clearAppliedWeight(){let{color:e,alpha:t}=this._state;if(e!=null){let{propertyName:n,initialValue:r}=e,s=this.material[n];s!=null&&s.copy(r)}if(t!=null){let{propertyName:n,initialValue:r}=t;this.material[n]!=null&&(this.material[n]=r)}}_initColorBindState(){var e,t,n;let{material:r,type:s,targetValue:o}=this,a=this._getPropertyNameMap(),l=(t=(e=a==null?void 0:a[s])==null?void 0:e[0])!=null?t:null;if(l==null)return console.warn(`Tried to add a material color bind to the material ${(n=r.name)!=null?n:"(no name)"}, the type ${s} but the material or the type is not supported.`),null;let u=r[l].clone(),h=new fe(o.r-u.r,o.g-u.g,o.b-u.b);return{propertyName:l,initialValue:u,deltaValue:h}}_initAlphaBindState(){var e,t,n;let{material:r,type:s,targetAlpha:o}=this,a=this._getPropertyNameMap(),l=(t=(e=a==null?void 0:a[s])==null?void 0:e[1])!=null?t:null;if(l==null&&o!==1)return console.warn(`Tried to add a material alpha bind to the material ${(n=r.name)!=null?n:"(no name)"}, the type ${s} but the material or the type does not support alpha.`),null;if(l==null)return null;let c=r[l],u=o-c;return{propertyName:l,initialValue:c,deltaValue:u}}_getPropertyNameMap(){var e,t;return(t=(e=Object.entries(cp._propertyNameMapMap).find(([n])=>this.material[n]===!0))==null?void 0:e[1])!=null?t:null}};lp._propertyNameMapMap={isMeshStandardMaterial:{color:["color","opacity"],emissionColor:["emissive",null]},isMeshBasicMaterial:{color:["color","opacity"]},isMToonMaterial:{color:["color","opacity"],emissionColor:["emissive",null],outlineColor:["outlineColorFactor",null],matcapColor:["matcapFactor",null],rimColor:["parametricRimColorFactor",null],shadeColor:["shadeColorFactor",null]}};var Af=lp,fl=class{constructor({primitives:i,index:e,weight:t}){this.primitives=i,this.index=e,this.weight=t}applyWeight(i){this.primitives.forEach(e=>{var t;((t=e.morphTargetInfluences)==null?void 0:t[this.index])!=null&&(e.morphTargetInfluences[this.index]+=this.weight*i)})}clearAppliedWeight(){this.primitives.forEach(i=>{var e;((e=i.morphTargetInfluences)==null?void 0:e[this.index])!=null&&(i.morphTargetInfluences[this.index]=0)})}},Rf=new Ae,up=class hp{constructor({material:e,scale:t,offset:n}){var r,s;this.material=e,this.scale=t,this.offset=n;let o=(r=Object.entries(hp._propertyNamesMap).find(([a])=>e[a]===!0))==null?void 0:r[1];o==null?(console.warn(`Tried to add a texture transform bind to the material ${(s=e.name)!=null?s:"(no name)"} but the material is not supported.`),this._properties=[]):(this._properties=[],o.forEach(a=>{var l;let c=(l=e[a])==null?void 0:l.clone();if(!c)return null;e[a]=c;let u=c.offset.clone(),h=c.repeat.clone(),d=n.clone().sub(u),f=t.clone().sub(h);this._properties.push({name:a,initialOffset:u,deltaOffset:d,initialScale:h,deltaScale:f})}))}applyWeight(e){this._properties.forEach(t=>{let n=this.material[t.name];n!==void 0&&(n.offset.add(Rf.copy(t.deltaOffset).multiplyScalar(e)),n.repeat.add(Rf.copy(t.deltaScale).multiplyScalar(e)))})}clearAppliedWeight(){this._properties.forEach(e=>{let t=this.material[e.name];t!==void 0&&(t.offset.copy(e.initialOffset),t.repeat.copy(e.initialScale))})}};up._propertyNamesMap={isMeshStandardMaterial:["map","emissiveMap","bumpMap","normalMap","displacementMap","roughnessMap","metalnessMap","alphaMap"],isMeshBasicMaterial:["map","specularMap","alphaMap"],isMToonMaterial:["map","normalMap","emissiveMap","shadeMultiplyTexture","rimMultiplyTexture","outlineWidthMultiplyTexture","uvAnimationMaskTexture"]};var Cf=up,vy=new Set(["1.0","1.0-beta"]),dp=class fp{get name(){return"VRMExpressionLoaderPlugin"}constructor(e){this.parser=e}afterRoot(e){return it(this,null,function*(){e.userData.vrmExpressionManager=yield this._import(e)})}_import(e){return it(this,null,function*(){let t=yield this._v1Import(e);if(t)return t;let n=yield this._v0Import(e);return n||null})}_v1Import(e){return it(this,null,function*(){var t,n;let r=this.parser.json;if(!(((t=r.extensionsUsed)==null?void 0:t.indexOf("VRMC_vrm"))!==-1))return null;let o=(n=r.extensions)==null?void 0:n.VRMC_vrm;if(!o)return null;let a=o.specVersion;if(!vy.has(a))return console.warn(`VRMExpressionLoaderPlugin: Unknown VRMC_vrm specVersion "${a}"`),null;let l=o.expressions;if(!l)return null;let c=new Set(Object.values(Vu)),u=new Map;l.preset!=null&&Object.entries(l.preset).forEach(([d,f])=>{if(f!=null){if(!c.has(d)){console.warn(`VRMExpressionLoaderPlugin: Unknown preset name "${d}" detected. Ignoring the expression`);return}u.set(d,f)}}),l.custom!=null&&Object.entries(l.custom).forEach(([d,f])=>{if(c.has(d)){console.warn(`VRMExpressionLoaderPlugin: Custom expression cannot have preset name "${d}". Ignoring the expression`);return}u.set(d,f)});let h=new wf;return yield Promise.all(Array.from(u.entries()).map(d=>it(this,[d],function*([f,p]){var _,g,m,y,S,v,A;let R=new Sf(f);if(e.scene.add(R),R.isBinary=(_=p.isBinary)!=null?_:!1,R.overrideBlink=(g=p.overrideBlink)!=null?g:"none",R.overrideLookAt=(m=p.overrideLookAt)!=null?m:"none",R.overrideMouth=(y=p.overrideMouth)!=null?y:"none",(S=p.morphTargetBinds)==null||S.forEach(I=>it(this,null,function*(){var L;if(I.node===void 0||I.index===void 0)return;let M=yield Tf(e,I.node),T=I.index;if(!M.every(C=>Array.isArray(C.morphTargetInfluences)&&T<C.morphTargetInfluences.length)){console.warn(`VRMExpressionLoaderPlugin: ${p.name} attempts to index morph #${T} but not found.`);return}R.addBind(new fl({primitives:M,index:T,weight:(L=I.weight)!=null?L:1}))})),p.materialColorBinds||p.textureTransformBinds){let I=[];e.scene.traverse(L=>{let M=L.material;M&&(Array.isArray(M)?I.push(...M):I.push(M))}),(v=p.materialColorBinds)==null||v.forEach(L=>it(this,null,function*(){I.filter(T=>{var C;let H=(C=this.parser.associations.get(T))==null?void 0:C.materials;return L.material===H}).forEach(T=>{R.addBind(new Af({material:T,type:L.type,targetValue:new fe().fromArray(L.targetValue),targetAlpha:L.targetValue[3]}))})})),(A=p.textureTransformBinds)==null||A.forEach(L=>it(this,null,function*(){I.filter(T=>{var C;let H=(C=this.parser.associations.get(T))==null?void 0:C.materials;return L.material===H}).forEach(T=>{var C,H;R.addBind(new Cf({material:T,offset:new Ae().fromArray((C=L.offset)!=null?C:[0,0]),scale:new Ae().fromArray((H=L.scale)!=null?H:[1,1])}))})}))}h.registerExpression(R)}))),h})}_v0Import(e){return it(this,null,function*(){var t;let n=this.parser.json,r=(t=n.extensions)==null?void 0:t.VRM;if(!r)return null;let s=r.blendShapeMaster;if(!s)return null;let o=new wf,a=s.blendShapeGroups;if(!a)return o;let l=new Set;return yield Promise.all(a.map(c=>it(this,null,function*(){var u;let h=c.presetName,d=h!=null&&fp.v0v1PresetNameMap[h]||null,f=d!=null?d:c.name;if(f==null){console.warn("VRMExpressionLoaderPlugin: One of custom expressions has no name. Ignoring the expression");return}if(l.has(f)){console.warn(`VRMExpressionLoaderPlugin: An expression preset ${h} has duplicated entries. Ignoring the expression`);return}l.add(f);let p=new Sf(f);e.scene.add(p),p.isBinary=(u=c.isBinary)!=null?u:!1,c.binds&&c.binds.forEach(g=>it(this,null,function*(){var m;if(g.mesh===void 0||g.index===void 0)return;let y=[];if((m=n.nodes)==null||m.forEach((v,A)=>{v.mesh===g.mesh&&y.push(A)}),y.length===0){console.warn(`VRMExpressionLoaderPlugin: ${c.name} attempts to bind a morph target to the mesh #${g.mesh} but the mesh is not found or not used in the scene. Ignoring the bind.`);return}let S=g.index;yield Promise.all(y.map(v=>it(this,null,function*(){var A;let R=yield Tf(e,v);if(!R.every(I=>Array.isArray(I.morphTargetInfluences)&&S<I.morphTargetInfluences.length)){console.warn(`VRMExpressionLoaderPlugin: ${c.name} attempts to index ${S}th morph but not found.`);return}p.addBind(new fl({primitives:R,index:S,weight:.01*((A=g.weight)!=null?A:100)}))})))}));let _=c.materialValues;_&&_.length!==0&&_.forEach(g=>{if(g.materialName===void 0||g.propertyName===void 0||g.targetValue===void 0)return;let m=[];e.scene.traverse(S=>{if(S.material){let v=S.material;Array.isArray(v)?m.push(...v.filter(A=>(A.name===g.materialName||A.name===g.materialName+" (Outline)")&&m.indexOf(A)===-1)):v.name===g.materialName&&m.indexOf(v)===-1&&m.push(v)}});let y=g.propertyName;m.forEach(S=>{if(y==="_MainTex_ST"){let A=new Ae(g.targetValue[0],g.targetValue[1]),R=new Ae(g.targetValue[2],g.targetValue[3]);R.y=1-R.y-A.y,p.addBind(new Cf({material:S,scale:A,offset:R}));return}let v=_y[y];if(v){p.addBind(new Af({material:S,type:v,targetValue:new fe().fromArray(g.targetValue),targetAlpha:g.targetValue[3]}));return}console.warn(y+" is not supported")})}),o.registerExpression(p)}))),o})}};dp.v0v1PresetNameMap={a:"aa",e:"ee",i:"ih",o:"oh",u:"ou",blink:"blink",joy:"happy",angry:"angry",sorrow:"sad",fun:"relaxed",lookup:"lookUp",lookdown:"lookDown",lookleft:"lookLeft",lookright:"lookRight",blink_l:"blinkLeft",blink_r:"blinkRight",neutral:"neutral"};var yy=dp;var Yu=class es{constructor(e,t){this._firstPersonOnlyLayer=es.DEFAULT_FIRSTPERSON_ONLY_LAYER,this._thirdPersonOnlyLayer=es.DEFAULT_THIRDPERSON_ONLY_LAYER,this._initializedLayers=!1,this.humanoid=e,this.meshAnnotations=t}copy(e){if(this.humanoid!==e.humanoid)throw new Error("VRMFirstPerson: humanoid must be same in order to copy");return this.meshAnnotations=e.meshAnnotations.map(t=>({meshes:t.meshes.concat(),type:t.type})),this}clone(){return new es(this.humanoid,this.meshAnnotations).copy(this)}get firstPersonOnlyLayer(){return this._firstPersonOnlyLayer}get thirdPersonOnlyLayer(){return this._thirdPersonOnlyLayer}setup({firstPersonOnlyLayer:e=es.DEFAULT_FIRSTPERSON_ONLY_LAYER,thirdPersonOnlyLayer:t=es.DEFAULT_THIRDPERSON_ONLY_LAYER}={}){this._initializedLayers||(this._firstPersonOnlyLayer=e,this._thirdPersonOnlyLayer=t,this.meshAnnotations.forEach(n=>{n.meshes.forEach(r=>{n.type==="firstPersonOnly"?(r.layers.set(this._firstPersonOnlyLayer),r.traverse(s=>s.layers.set(this._firstPersonOnlyLayer))):n.type==="thirdPersonOnly"?(r.layers.set(this._thirdPersonOnlyLayer),r.traverse(s=>s.layers.set(this._thirdPersonOnlyLayer))):n.type==="auto"&&this._createHeadlessModel(r)})}),this._initializedLayers=!0)}_excludeTriangles(e,t,n,r){let s=0;if(t!=null&&t.length>0)for(let o=0;o<e.length;o+=3){let a=e[o],l=e[o+1],c=e[o+2],u=t[a],h=n[a];if(u[0]>0&&r.includes(h[0])||u[1]>0&&r.includes(h[1])||u[2]>0&&r.includes(h[2])||u[3]>0&&r.includes(h[3]))continue;let d=t[l],f=n[l];if(d[0]>0&&r.includes(f[0])||d[1]>0&&r.includes(f[1])||d[2]>0&&r.includes(f[2])||d[3]>0&&r.includes(f[3]))continue;let p=t[c],_=n[c];p[0]>0&&r.includes(_[0])||p[1]>0&&r.includes(_[1])||p[2]>0&&r.includes(_[2])||p[3]>0&&r.includes(_[3])||(e[s++]=a,e[s++]=l,e[s++]=c)}return s}_createErasedMesh(e,t){let n=new Kn(e.geometry.clone(),e.material);n.name=`${e.name}(erase)`,n.frustumCulled=e.frustumCulled,n.layers.set(this._firstPersonOnlyLayer);let r=n.geometry,s=r.getAttribute("skinIndex"),o=s instanceof si?[]:s.array,a=[];for(let _=0;_<o.length;_+=4)a.push([o[_],o[_+1],o[_+2],o[_+3]]);let l=r.getAttribute("skinWeight"),c=l instanceof si?[]:l.array,u=[];for(let _=0;_<c.length;_+=4)u.push([c[_],c[_+1],c[_+2],c[_+3]]);let h=r.getIndex();if(!h)throw new Error("The geometry doesn't have an index buffer");let d=Array.from(h.array),f=this._excludeTriangles(d,u,a,t),p=[];for(let _=0;_<f;_++)p[_]=d[_];return r.setIndex(p),e.onBeforeRender&&(n.onBeforeRender=e.onBeforeRender),n.bind(new nn(e.skeleton.bones,e.skeleton.boneInverses),new ve),n}_createHeadlessModelForSkinnedMesh(e,t){let n=[];if(t.skeleton.bones.forEach((s,o)=>{this._isEraseTarget(s)&&n.push(o)}),!n.length){t.layers.enable(this._thirdPersonOnlyLayer),t.layers.enable(this._firstPersonOnlyLayer);return}t.layers.set(this._thirdPersonOnlyLayer);let r=this._createErasedMesh(t,n);e.add(r)}_createHeadlessModel(e){if(e.type==="Group")if(e.layers.set(this._thirdPersonOnlyLayer),this._isEraseTarget(e))e.traverse(t=>t.layers.set(this._thirdPersonOnlyLayer));else{let t=new mt;t.name=`_headless_${e.name}`,t.layers.set(this._firstPersonOnlyLayer),e.parent.add(t),e.children.filter(n=>n.type==="SkinnedMesh").forEach(n=>{let r=n;this._createHeadlessModelForSkinnedMesh(t,r)})}else if(e.type==="SkinnedMesh"){let t=e;this._createHeadlessModelForSkinnedMesh(e.parent,t)}else this._isEraseTarget(e)&&(e.layers.set(this._thirdPersonOnlyLayer),e.traverse(t=>t.layers.set(this._thirdPersonOnlyLayer)))}_isEraseTarget(e){return e===this.humanoid.getRawBoneNode("head")?!0:e.parent?this._isEraseTarget(e.parent):!1}};Yu.DEFAULT_FIRSTPERSON_ONLY_LAYER=9;Yu.DEFAULT_THIRDPERSON_ONLY_LAYER=10;var Pf=Yu,My=new Set(["1.0","1.0-beta"]),Ey=class{get name(){return"VRMFirstPersonLoaderPlugin"}constructor(i){this.parser=i}afterRoot(i){return it(this,null,function*(){let e=i.userData.vrmHumanoid;if(e!==null){if(e===void 0)throw new Error("VRMFirstPersonLoaderPlugin: vrmHumanoid is undefined. VRMHumanoidLoaderPlugin have to be used first");i.userData.vrmFirstPerson=yield this._import(i,e)}})}_import(i,e){return it(this,null,function*(){if(e==null)return null;let t=yield this._v1Import(i,e);if(t)return t;let n=yield this._v0Import(i,e);return n||null})}_v1Import(i,e){return it(this,null,function*(){var t,n;let r=this.parser.json;if(!(((t=r.extensionsUsed)==null?void 0:t.indexOf("VRMC_vrm"))!==-1))return null;let o=(n=r.extensions)==null?void 0:n.VRMC_vrm;if(!o)return null;let a=o.specVersion;if(!My.has(a))return console.warn(`VRMFirstPersonLoaderPlugin: Unknown VRMC_vrm specVersion "${a}"`),null;let l=o.firstPerson,c=[],u=yield bf(i);return Array.from(u.entries()).forEach(([h,d])=>{var f,p;let _=(f=l==null?void 0:l.meshAnnotations)==null?void 0:f.find(g=>g.node===h);c.push({meshes:d,type:(p=_==null?void 0:_.type)!=null?p:"auto"})}),new Pf(e,c)})}_v0Import(i,e){return it(this,null,function*(){var t;let n=this.parser.json,r=(t=n.extensions)==null?void 0:t.VRM;if(!r)return null;let s=r.firstPerson;if(!s)return null;let o=[],a=yield bf(i);return Array.from(a.entries()).forEach(([l,c])=>{let u=n.nodes[l],h=s.meshAnnotations?s.meshAnnotations.find(d=>d.mesh===u.mesh):void 0;o.push({meshes:c,type:this._convertV0FlagToV1Type(h==null?void 0:h.firstPersonFlag)})}),new Pf(e,o)})}_convertV0FlagToV1Type(i){return i==="FirstPersonOnly"?"firstPersonOnly":i==="ThirdPersonOnly"?"thirdPersonOnly":i==="Both"?"both":"auto"}};var If=new w,Lf=new w,Sy=new Q,Nf=class extends mt{constructor(i){super(),this.vrmHumanoid=i,this._boneAxesMap=new Map,Object.values(i.humanBones).forEach(e=>{let t=new zs(1);t.matrixAutoUpdate=!1,t.material.depthTest=!1,t.material.depthWrite=!1,this.add(t),this._boneAxesMap.set(e,t)})}dispose(){Array.from(this._boneAxesMap.values()).forEach(i=>{i.geometry.dispose(),i.material.dispose()})}updateMatrixWorld(i){Array.from(this._boneAxesMap.entries()).forEach(([e,t])=>{e.node.updateWorldMatrix(!0,!1),e.node.matrixWorld.decompose(If,Sy,Lf);let n=If.set(.1,.1,.1).divide(Lf);t.matrix.copy(e.node.matrixWorld).scale(n)}),super.updateMatrixWorld(i)}},Cu=["hips","spine","chest","upperChest","neck","head","leftEye","rightEye","jaw","leftUpperLeg","leftLowerLeg","leftFoot","leftToes","rightUpperLeg","rightLowerLeg","rightFoot","rightToes","leftShoulder","leftUpperArm","leftLowerArm","leftHand","rightShoulder","rightUpperArm","rightLowerArm","rightHand","leftThumbMetacarpal","leftThumbProximal","leftThumbDistal","leftIndexProximal","leftIndexIntermediate","leftIndexDistal","leftMiddleProximal","leftMiddleIntermediate","leftMiddleDistal","leftRingProximal","leftRingIntermediate","leftRingDistal","leftLittleProximal","leftLittleIntermediate","leftLittleDistal","rightThumbMetacarpal","rightThumbProximal","rightThumbDistal","rightIndexProximal","rightIndexIntermediate","rightIndexDistal","rightMiddleProximal","rightMiddleIntermediate","rightMiddleDistal","rightRingProximal","rightRingIntermediate","rightRingDistal","rightLittleProximal","rightLittleIntermediate","rightLittleDistal"];var Ty={hips:null,spine:"hips",chest:"spine",upperChest:"chest",neck:"upperChest",head:"neck",leftEye:"head",rightEye:"head",jaw:"head",leftUpperLeg:"hips",leftLowerLeg:"leftUpperLeg",leftFoot:"leftLowerLeg",leftToes:"leftFoot",rightUpperLeg:"hips",rightLowerLeg:"rightUpperLeg",rightFoot:"rightLowerLeg",rightToes:"rightFoot",leftShoulder:"upperChest",leftUpperArm:"leftShoulder",leftLowerArm:"leftUpperArm",leftHand:"leftLowerArm",rightShoulder:"upperChest",rightUpperArm:"rightShoulder",rightLowerArm:"rightUpperArm",rightHand:"rightLowerArm",leftThumbMetacarpal:"leftHand",leftThumbProximal:"leftThumbMetacarpal",leftThumbDistal:"leftThumbProximal",leftIndexProximal:"leftHand",leftIndexIntermediate:"leftIndexProximal",leftIndexDistal:"leftIndexIntermediate",leftMiddleProximal:"leftHand",leftMiddleIntermediate:"leftMiddleProximal",leftMiddleDistal:"leftMiddleIntermediate",leftRingProximal:"leftHand",leftRingIntermediate:"leftRingProximal",leftRingDistal:"leftRingIntermediate",leftLittleProximal:"leftHand",leftLittleIntermediate:"leftLittleProximal",leftLittleDistal:"leftLittleIntermediate",rightThumbMetacarpal:"rightHand",rightThumbProximal:"rightThumbMetacarpal",rightThumbDistal:"rightThumbProximal",rightIndexProximal:"rightHand",rightIndexIntermediate:"rightIndexProximal",rightIndexDistal:"rightIndexIntermediate",rightMiddleProximal:"rightHand",rightMiddleIntermediate:"rightMiddleProximal",rightMiddleDistal:"rightMiddleIntermediate",rightRingProximal:"rightHand",rightRingIntermediate:"rightRingProximal",rightRingDistal:"rightRingIntermediate",rightLittleProximal:"rightHand",rightLittleIntermediate:"rightLittleProximal",rightLittleDistal:"rightLittleIntermediate"};function pp(i){return i.invert?i.invert():i.inverse(),i}var tr=new w,nr=new Q,zu=class{constructor(i){this.humanBones=i,this.restPose=this.getAbsolutePose()}getAbsolutePose(){let i={};return Object.keys(this.humanBones).forEach(e=>{let t=e,n=this.getBoneNode(t);n&&(tr.copy(n.position),nr.copy(n.quaternion),i[t]={position:tr.toArray(),rotation:nr.toArray()})}),i}getPose(){let i={};return Object.keys(this.humanBones).forEach(e=>{let t=e,n=this.getBoneNode(t);if(!n)return;tr.set(0,0,0),nr.identity();let r=this.restPose[t];r!=null&&r.position&&tr.fromArray(r.position).negate(),r!=null&&r.rotation&&pp(nr.fromArray(r.rotation)),tr.add(n.position),nr.premultiply(n.quaternion),i[t]={position:tr.toArray(),rotation:nr.toArray()}}),i}setPose(i){Object.entries(i).forEach(([e,t])=>{let n=e,r=this.getBoneNode(n);if(!r)return;let s=this.restPose[n];s&&(t!=null&&t.position&&(r.position.fromArray(t.position),s.position&&r.position.add(tr.fromArray(s.position))),t!=null&&t.rotation&&(r.quaternion.fromArray(t.rotation),s.rotation&&r.quaternion.multiply(nr.fromArray(s.rotation))))})}resetPose(){Object.entries(this.restPose).forEach(([i,e])=>{let t=this.getBoneNode(i);t&&(e!=null&&e.position&&t.position.fromArray(e.position),e!=null&&e.rotation&&t.quaternion.fromArray(e.rotation))})}getBone(i){var e;return(e=this.humanBones[i])!=null?e:void 0}getBoneNode(i){var e,t;return(t=(e=this.humanBones[i])==null?void 0:e.node)!=null?t:null}},Pu=new w,by=new Q,wy=new w,Uf=class mp extends zu{static _setupTransforms(e){let t=new Qe;t.name="VRMHumanoidRig";let n={},r={},s={},o={};Cu.forEach(l=>{var c;let u=e.getBoneNode(l);if(u){let h=new w,d=new Q;u.updateWorldMatrix(!0,!1),u.matrixWorld.decompose(h,d,Pu),n[l]=h,r[l]=d,s[l]=u.quaternion.clone();let f=new Q;(c=u.parent)==null||c.matrixWorld.decompose(Pu,f,Pu),o[l]=f}});let a={};return Cu.forEach(l=>{var c;let u=e.getBoneNode(l);if(u){let h=n[l],d=l,f;for(;f==null&&(d=Ty[d],d!=null);)f=n[d];let p=new Qe;p.name="Normalized_"+u.name,(d?(c=a[d])==null?void 0:c.node:t).add(p),p.position.copy(h),f&&p.position.sub(f),a[l]={node:p}}}),{rigBones:a,root:t,parentWorldRotations:o,boneRotations:s}}constructor(e){let{rigBones:t,root:n,parentWorldRotations:r,boneRotations:s}=mp._setupTransforms(e);super(t),this.original=e,this.root=n,this._parentWorldRotations=r,this._boneRotations=s}update(){Cu.forEach(e=>{let t=this.original.getBoneNode(e);if(t!=null){let n=this.getBoneNode(e),r=this._parentWorldRotations[e],s=by.copy(r).invert(),o=this._boneRotations[e];if(t.quaternion.copy(n.quaternion).multiply(r).premultiply(s).multiply(o),e==="hips"){let a=n.getWorldPosition(wy);t.parent.updateWorldMatrix(!0,!1);let l=t.parent.matrixWorld,c=a.applyMatrix4(l.invert());t.position.copy(c)}}})}},Df=class gp{get restPose(){return console.warn("VRMHumanoid: restPose is deprecated. Use either rawRestPose or normalizedRestPose instead."),this.rawRestPose}get rawRestPose(){return this._rawHumanBones.restPose}get normalizedRestPose(){return this._normalizedHumanBones.restPose}get humanBones(){return this._rawHumanBones.humanBones}get rawHumanBones(){return this._rawHumanBones.humanBones}get normalizedHumanBones(){return this._normalizedHumanBones.humanBones}get normalizedHumanBonesRoot(){return this._normalizedHumanBones.root}constructor(e,t){var n;this.autoUpdateHumanBones=(n=t==null?void 0:t.autoUpdateHumanBones)!=null?n:!0,this._rawHumanBones=new zu(e),this._normalizedHumanBones=new Uf(this._rawHumanBones)}copy(e){return this.autoUpdateHumanBones=e.autoUpdateHumanBones,this._rawHumanBones=new zu(e.humanBones),this._normalizedHumanBones=new Uf(this._rawHumanBones),this}clone(){return new gp(this.humanBones,{autoUpdateHumanBones:this.autoUpdateHumanBones}).copy(this)}getAbsolutePose(){return console.warn("VRMHumanoid: getAbsolutePose() is deprecated. Use either getRawAbsolutePose() or getNormalizedAbsolutePose() instead."),this.getRawAbsolutePose()}getRawAbsolutePose(){return this._rawHumanBones.getAbsolutePose()}getNormalizedAbsolutePose(){return this._normalizedHumanBones.getAbsolutePose()}getPose(){return console.warn("VRMHumanoid: getPose() is deprecated. Use either getRawPose() or getNormalizedPose() instead."),this.getRawPose()}getRawPose(){return this._rawHumanBones.getPose()}getNormalizedPose(){return this._normalizedHumanBones.getPose()}setPose(e){return console.warn("VRMHumanoid: setPose() is deprecated. Use either setRawPose() or setNormalizedPose() instead."),this.setRawPose(e)}setRawPose(e){return this._rawHumanBones.setPose(e)}setNormalizedPose(e){return this._normalizedHumanBones.setPose(e)}resetPose(){return console.warn("VRMHumanoid: resetPose() is deprecated. Use either resetRawPose() or resetNormalizedPose() instead."),this.resetRawPose()}resetRawPose(){return this._rawHumanBones.resetPose()}resetNormalizedPose(){return this._normalizedHumanBones.resetPose()}getBone(e){return console.warn("VRMHumanoid: getBone() is deprecated. Use either getRawBone() or getNormalizedBone() instead."),this.getRawBone(e)}getRawBone(e){return this._rawHumanBones.getBone(e)}getNormalizedBone(e){return this._normalizedHumanBones.getBone(e)}getBoneNode(e){return console.warn("VRMHumanoid: getBoneNode() is deprecated. Use either getRawBoneNode() or getNormalizedBoneNode() instead."),this.getRawBoneNode(e)}getRawBoneNode(e){return this._rawHumanBones.getBoneNode(e)}getNormalizedBoneNode(e){return this._normalizedHumanBones.getBoneNode(e)}update(){this.autoUpdateHumanBones&&this._normalizedHumanBones.update()}},Ay={Hips:"hips",Spine:"spine",Head:"head",LeftUpperLeg:"leftUpperLeg",LeftLowerLeg:"leftLowerLeg",LeftFoot:"leftFoot",RightUpperLeg:"rightUpperLeg",RightLowerLeg:"rightLowerLeg",RightFoot:"rightFoot",LeftUpperArm:"leftUpperArm",LeftLowerArm:"leftLowerArm",LeftHand:"leftHand",RightUpperArm:"rightUpperArm",RightLowerArm:"rightLowerArm",RightHand:"rightHand"},Ry=new Set(["1.0","1.0-beta"]),Of={leftThumbProximal:"leftThumbMetacarpal",leftThumbIntermediate:"leftThumbProximal",rightThumbProximal:"rightThumbMetacarpal",rightThumbIntermediate:"rightThumbProximal"},Cy=class{get name(){return"VRMHumanoidLoaderPlugin"}constructor(i,e){this.parser=i,this.helperRoot=e==null?void 0:e.helperRoot,this.autoUpdateHumanBones=e==null?void 0:e.autoUpdateHumanBones}afterRoot(i){return it(this,null,function*(){i.userData.vrmHumanoid=yield this._import(i)})}_import(i){return it(this,null,function*(){let e=yield this._v1Import(i);if(e)return e;let t=yield this._v0Import(i);return t||null})}_v1Import(i){return it(this,null,function*(){var e,t;let n=this.parser.json;if(!(((e=n.extensionsUsed)==null?void 0:e.indexOf("VRMC_vrm"))!==-1))return null;let s=(t=n.extensions)==null?void 0:t.VRMC_vrm;if(!s)return null;let o=s.specVersion;if(!Ry.has(o))return console.warn(`VRMHumanoidLoaderPlugin: Unknown VRMC_vrm specVersion "${o}"`),null;let a=s.humanoid;if(!a)return null;let l=a.humanBones.leftThumbIntermediate!=null||a.humanBones.rightThumbIntermediate!=null,c={};a.humanBones!=null&&(yield Promise.all(Object.entries(a.humanBones).map(h=>it(this,[h],function*([d,f]){let p=d,_=f.node;if(l){let m=Of[p];m!=null&&(p=m)}let g=yield this.parser.getDependency("node",_);if(g==null){console.warn(`A glTF node bound to the humanoid bone ${p} (index = ${_}) does not exist`);return}c[p]={node:g}}))));let u=new Df(this._ensureRequiredBonesExist(c),{autoUpdateHumanBones:this.autoUpdateHumanBones});if(i.scene.add(u.normalizedHumanBonesRoot),this.helperRoot){let h=new Nf(u);this.helperRoot.add(h),h.renderOrder=this.helperRoot.renderOrder}return u})}_v0Import(i){return it(this,null,function*(){var e;let n=(e=this.parser.json.extensions)==null?void 0:e.VRM;if(!n)return null;let r=n.humanoid;if(!r)return null;let s={};r.humanBones!=null&&(yield Promise.all(r.humanBones.map(a=>it(this,null,function*(){let l=a.bone,c=a.node;if(l==null||c==null)return;if(c<0){console.warn(`A glTF node index for the humanoid bone ${l} is negative (${c}), ignoring this bone.`);return}let u=yield this.parser.getDependency("node",c);if(u==null){console.warn(`A glTF node bound to the humanoid bone ${l} (index = ${c}) does not exist`);return}let h=Of[l],d=h!=null?h:l;if(s[d]!=null){console.warn(`Multiple bone entries for ${d} detected (index = ${c}), ignoring duplicated entries.`);return}s[d]={node:u}}))));let o=new Df(this._ensureRequiredBonesExist(s),{autoUpdateHumanBones:this.autoUpdateHumanBones});if(i.scene.add(o.normalizedHumanBonesRoot),this.helperRoot){let a=new Nf(o);this.helperRoot.add(a),a.renderOrder=this.helperRoot.renderOrder}return o})}_ensureRequiredBonesExist(i){let e=Object.values(Ay).filter(t=>i[t]==null);if(e.length>0)throw new Error(`VRMHumanoidLoaderPlugin: These humanoid bones are required but not exist: ${e.join(", ")}`);return i}},Ff=class extends nt{constructor(){super(),this._currentTheta=0,this._currentRadius=0,this.theta=0,this.radius=0,this._currentTheta=0,this._currentRadius=0,this._attrPos=new ke(new Float32Array(195),3),this.setAttribute("position",this._attrPos),this._attrIndex=new ke(new Uint16Array(189),1),this.setIndex(this._attrIndex),this._buildIndex(),this.update()}update(){let i=!1;this._currentTheta!==this.theta&&(this._currentTheta=this.theta,i=!0),this._currentRadius!==this.radius&&(this._currentRadius=this.radius,i=!0),i&&this._buildPosition()}_buildPosition(){this._attrPos.setXYZ(0,0,0,0);for(let i=0;i<64;i++){let e=i/63*this._currentTheta;this._attrPos.setXYZ(i+1,this._currentRadius*Math.sin(e),0,this._currentRadius*Math.cos(e))}this._attrPos.needsUpdate=!0}_buildIndex(){for(let i=0;i<63;i++)this._attrIndex.setXYZ(i*3,0,i+1,i+2);this._attrIndex.needsUpdate=!0}},Py=class extends nt{constructor(){super(),this.radius=0,this._currentRadius=0,this.tail=new w,this._currentTail=new w,this._attrPos=new ke(new Float32Array(294),3),this.setAttribute("position",this._attrPos),this._attrIndex=new ke(new Uint16Array(194),1),this.setIndex(this._attrIndex),this._buildIndex(),this.update()}update(){let i=!1;this._currentRadius!==this.radius&&(this._currentRadius=this.radius,i=!0),this._currentTail.equals(this.tail)||(this._currentTail.copy(this.tail),i=!0),i&&this._buildPosition()}_buildPosition(){for(let i=0;i<32;i++){let e=i/16*Math.PI;this._attrPos.setXYZ(i,Math.cos(e),Math.sin(e),0),this._attrPos.setXYZ(32+i,0,Math.cos(e),Math.sin(e)),this._attrPos.setXYZ(64+i,Math.sin(e),0,Math.cos(e))}this.scale(this._currentRadius,this._currentRadius,this._currentRadius),this.translate(this._currentTail.x,this._currentTail.y,this._currentTail.z),this._attrPos.setXYZ(96,0,0,0),this._attrPos.setXYZ(97,this._currentTail.x,this._currentTail.y,this._currentTail.z),this._attrPos.needsUpdate=!0}_buildIndex(){for(let i=0;i<32;i++){let e=(i+1)%32;this._attrIndex.setXY(i*2,i,e),this._attrIndex.setXY(64+i*2,32+i,32+e),this._attrIndex.setXY(128+i*2,64+i,64+e)}this._attrIndex.setXY(192,96,97),this._attrIndex.needsUpdate=!0}},al=new Q,Bf=new Q,eo=new w,kf=new w,Hf=Math.sqrt(2)/2,Iy=new Q(0,0,-Hf,Hf),Ly=new w(0,1,0),Ny=class extends mt{constructor(i){super(),this.matrixAutoUpdate=!1,this.vrmLookAt=i;{let e=new Ff;e.radius=.5;let t=new Bt({color:65280,transparent:!0,opacity:.5,side:Xt,depthTest:!1,depthWrite:!1});this._meshPitch=new Et(e,t),this.add(this._meshPitch)}{let e=new Ff;e.radius=.5;let t=new Bt({color:16711680,transparent:!0,opacity:.5,side:Xt,depthTest:!1,depthWrite:!1});this._meshYaw=new Et(e,t),this.add(this._meshYaw)}{let e=new Py;e.radius=.1;let t=new Wt({color:16777215,depthTest:!1,depthWrite:!1});this._lineTarget=new un(e,t),this._lineTarget.frustumCulled=!1,this.add(this._lineTarget)}}dispose(){this._meshYaw.geometry.dispose(),this._meshYaw.material.dispose(),this._meshPitch.geometry.dispose(),this._meshPitch.material.dispose(),this._lineTarget.geometry.dispose(),this._lineTarget.material.dispose()}updateMatrixWorld(i){let e=De.DEG2RAD*this.vrmLookAt.yaw;this._meshYaw.geometry.theta=e,this._meshYaw.geometry.update();let t=De.DEG2RAD*this.vrmLookAt.pitch;this._meshPitch.geometry.theta=t,this._meshPitch.geometry.update(),this.vrmLookAt.getLookAtWorldPosition(eo),this.vrmLookAt.getLookAtWorldQuaternion(al),al.multiply(this.vrmLookAt.getFaceFrontQuaternion(Bf)),this._meshYaw.position.copy(eo),this._meshYaw.quaternion.copy(al),this._meshPitch.position.copy(eo),this._meshPitch.quaternion.copy(al),this._meshPitch.quaternion.multiply(Bf.setFromAxisAngle(Ly,e)),this._meshPitch.quaternion.multiply(Iy);let{target:n,autoUpdate:r}=this.vrmLookAt;n!=null&&r&&(n.getWorldPosition(kf).sub(eo),this._lineTarget.geometry.tail.copy(kf),this._lineTarget.geometry.update(),this._lineTarget.position.copy(eo)),super.updateMatrixWorld(i)}},Uy=new w,Dy=new w;function Gu(i,e){return i.matrixWorld.decompose(Uy,e,Dy),e}function ul(i){return[Math.atan2(-i.z,i.x),Math.atan2(i.y,Math.sqrt(i.x*i.x+i.z*i.z))]}function Vf(i){let e=Math.round(i/2/Math.PI);return i-2*Math.PI*e}var zf=new w(0,0,1),Oy=new w,Fy=new w,By=new w,ky=new Q,Iu=new Q,Gf=new Q,Hy=new Q,Lu=new gt,_p=class xp{constructor(e,t){this.offsetFromHeadBone=new w,this.autoUpdate=!0,this.faceFront=new w(0,0,1),this.humanoid=e,this.applier=t,this._yaw=0,this._pitch=0,this._needsUpdate=!0,this._restHeadWorldQuaternion=this.getLookAtWorldQuaternion(new Q)}get yaw(){return this._yaw}set yaw(e){this._yaw=e,this._needsUpdate=!0}get pitch(){return this._pitch}set pitch(e){this._pitch=e,this._needsUpdate=!0}get euler(){return console.warn("VRMLookAt: euler is deprecated. use getEuler() instead."),this.getEuler(new gt)}getEuler(e){return e.set(De.DEG2RAD*this._pitch,De.DEG2RAD*this._yaw,0,"YXZ")}copy(e){if(this.humanoid!==e.humanoid)throw new Error("VRMLookAt: humanoid must be same in order to copy");return this.offsetFromHeadBone.copy(e.offsetFromHeadBone),this.applier=e.applier,this.autoUpdate=e.autoUpdate,this.target=e.target,this.faceFront.copy(e.faceFront),this}clone(){return new xp(this.humanoid,this.applier).copy(this)}reset(){this._yaw=0,this._pitch=0,this._needsUpdate=!0}getLookAtWorldPosition(e){let t=this.humanoid.getRawBoneNode("head");return e.copy(this.offsetFromHeadBone).applyMatrix4(t.matrixWorld)}getLookAtWorldQuaternion(e){let t=this.humanoid.getRawBoneNode("head");return Gu(t,e)}getFaceFrontQuaternion(e){if(this.faceFront.distanceToSquared(zf)<.01)return e.copy(this._restHeadWorldQuaternion).invert();let[t,n]=ul(this.faceFront);return Lu.set(0,.5*Math.PI+t,n,"YZX"),e.setFromEuler(Lu).premultiply(Hy.copy(this._restHeadWorldQuaternion).invert())}getLookAtWorldDirection(e){return this.getLookAtWorldQuaternion(Iu),this.getFaceFrontQuaternion(Gf),e.copy(zf).applyQuaternion(Iu).applyQuaternion(Gf).applyEuler(this.getEuler(Lu))}lookAt(e){let t=ky.copy(this._restHeadWorldQuaternion).multiply(pp(this.getLookAtWorldQuaternion(Iu))),n=this.getLookAtWorldPosition(Fy),r=By.copy(e).sub(n).applyQuaternion(t).normalize(),[s,o]=ul(this.faceFront),[a,l]=ul(r),c=Vf(a-s),u=Vf(o-l);this._yaw=De.RAD2DEG*c,this._pitch=De.RAD2DEG*u,this._needsUpdate=!0}update(e){this.target!=null&&this.autoUpdate&&this.lookAt(this.target.getWorldPosition(Oy)),this._needsUpdate&&(this._needsUpdate=!1,this.applier.applyYawPitch(this._yaw,this._pitch))}};_p.EULER_ORDER="YXZ";var Vy=_p,zy=new w(0,0,1),On=new Q,Kr=new Q,mn=new gt(0,0,0,"YXZ"),hl=class{constructor(i,e,t,n,r){this.humanoid=i,this.rangeMapHorizontalInner=e,this.rangeMapHorizontalOuter=t,this.rangeMapVerticalDown=n,this.rangeMapVerticalUp=r,this.faceFront=new w(0,0,1),this._restQuatLeftEye=new Q,this._restQuatRightEye=new Q,this._restLeftEyeParentWorldQuat=new Q,this._restRightEyeParentWorldQuat=new Q;let s=this.humanoid.getRawBoneNode("leftEye"),o=this.humanoid.getRawBoneNode("rightEye");s&&(this._restQuatLeftEye.copy(s.quaternion),Gu(s.parent,this._restLeftEyeParentWorldQuat)),o&&(this._restQuatRightEye.copy(o.quaternion),Gu(o.parent,this._restRightEyeParentWorldQuat))}applyYawPitch(i,e){let t=this.humanoid.getRawBoneNode("leftEye"),n=this.humanoid.getRawBoneNode("rightEye"),r=this.humanoid.getNormalizedBoneNode("leftEye"),s=this.humanoid.getNormalizedBoneNode("rightEye");t&&(e<0?mn.x=-De.DEG2RAD*this.rangeMapVerticalDown.map(-e):mn.x=De.DEG2RAD*this.rangeMapVerticalUp.map(e),i<0?mn.y=-De.DEG2RAD*this.rangeMapHorizontalInner.map(-i):mn.y=De.DEG2RAD*this.rangeMapHorizontalOuter.map(i),On.setFromEuler(mn),this._getWorldFaceFrontQuat(Kr),r.quaternion.copy(Kr).multiply(On).multiply(Kr.invert()),On.copy(this._restLeftEyeParentWorldQuat),t.quaternion.copy(r.quaternion).multiply(On).premultiply(On.invert()).multiply(this._restQuatLeftEye)),n&&(e<0?mn.x=-De.DEG2RAD*this.rangeMapVerticalDown.map(-e):mn.x=De.DEG2RAD*this.rangeMapVerticalUp.map(e),i<0?mn.y=-De.DEG2RAD*this.rangeMapHorizontalOuter.map(-i):mn.y=De.DEG2RAD*this.rangeMapHorizontalInner.map(i),On.setFromEuler(mn),this._getWorldFaceFrontQuat(Kr),s.quaternion.copy(Kr).multiply(On).multiply(Kr.invert()),On.copy(this._restRightEyeParentWorldQuat),n.quaternion.copy(s.quaternion).multiply(On).premultiply(On.invert()).multiply(this._restQuatRightEye))}lookAt(i){console.warn("VRMLookAtBoneApplier: lookAt() is deprecated. use apply() instead.");let e=De.RAD2DEG*i.y,t=De.RAD2DEG*i.x;this.applyYawPitch(e,t)}_getWorldFaceFrontQuat(i){if(this.faceFront.distanceToSquared(zy)<.01)return i.identity();let[e,t]=ul(this.faceFront);return mn.set(0,.5*Math.PI+e,t,"YZX"),i.setFromEuler(mn)}};hl.type="bone";var Wu=class{constructor(i,e,t,n,r){this.expressions=i,this.rangeMapHorizontalInner=e,this.rangeMapHorizontalOuter=t,this.rangeMapVerticalDown=n,this.rangeMapVerticalUp=r}applyYawPitch(i,e){e<0?(this.expressions.setValue("lookDown",0),this.expressions.setValue("lookUp",this.rangeMapVerticalUp.map(-e))):(this.expressions.setValue("lookUp",0),this.expressions.setValue("lookDown",this.rangeMapVerticalDown.map(e))),i<0?(this.expressions.setValue("lookLeft",0),this.expressions.setValue("lookRight",this.rangeMapHorizontalOuter.map(-i))):(this.expressions.setValue("lookRight",0),this.expressions.setValue("lookLeft",this.rangeMapHorizontalOuter.map(i)))}lookAt(i){console.warn("VRMLookAtBoneApplier: lookAt() is deprecated. use apply() instead.");let e=De.RAD2DEG*i.y,t=De.RAD2DEG*i.x;this.applyYawPitch(e,t)}};Wu.type="expression";var Wf=class{constructor(i,e){this.inputMaxValue=i,this.outputScale=e}map(i){return this.outputScale*op(i/this.inputMaxValue)}},Gy=new Set(["1.0","1.0-beta"]),ll=.01,Wy=class{get name(){return"VRMLookAtLoaderPlugin"}constructor(i,e){this.parser=i,this.helperRoot=e==null?void 0:e.helperRoot}afterRoot(i){return it(this,null,function*(){let e=i.userData.vrmHumanoid;if(e===null)return;if(e===void 0)throw new Error("VRMLookAtLoaderPlugin: vrmHumanoid is undefined. VRMHumanoidLoaderPlugin have to be used first");let t=i.userData.vrmExpressionManager;if(t!==null){if(t===void 0)throw new Error("VRMLookAtLoaderPlugin: vrmExpressionManager is undefined. VRMExpressionLoaderPlugin have to be used first");i.userData.vrmLookAt=yield this._import(i,e,t)}})}_import(i,e,t){return it(this,null,function*(){if(e==null||t==null)return null;let n=yield this._v1Import(i,e,t);if(n)return n;let r=yield this._v0Import(i,e,t);return r||null})}_v1Import(i,e,t){return it(this,null,function*(){var n,r,s;let o=this.parser.json;if(!(((n=o.extensionsUsed)==null?void 0:n.indexOf("VRMC_vrm"))!==-1))return null;let l=(r=o.extensions)==null?void 0:r.VRMC_vrm;if(!l)return null;let c=l.specVersion;if(!Gy.has(c))return console.warn(`VRMLookAtLoaderPlugin: Unknown VRMC_vrm specVersion "${c}"`),null;let u=l.lookAt;if(!u)return null;let h=u.type==="expression"?1:10,d=this._v1ImportRangeMap(u.rangeMapHorizontalInner,h),f=this._v1ImportRangeMap(u.rangeMapHorizontalOuter,h),p=this._v1ImportRangeMap(u.rangeMapVerticalDown,h),_=this._v1ImportRangeMap(u.rangeMapVerticalUp,h),g;u.type==="expression"?g=new Wu(t,d,f,p,_):g=new hl(e,d,f,p,_);let m=this._importLookAt(e,g);return m.offsetFromHeadBone.fromArray((s=u.offsetFromHeadBone)!=null?s:[0,.06,0]),m})}_v1ImportRangeMap(i,e){var t,n;let r=(t=i==null?void 0:i.inputMaxValue)!=null?t:90,s=(n=i==null?void 0:i.outputScale)!=null?n:e;return r<ll&&(console.warn("VRMLookAtLoaderPlugin: inputMaxValue of a range map is too small. Consider reviewing the range map!"),r=ll),new Wf(r,s)}_v0Import(i,e,t){return it(this,null,function*(){var n,r,s,o;let l=(n=this.parser.json.extensions)==null?void 0:n.VRM;if(!l)return null;let c=l.firstPerson;if(!c)return null;let u=c.lookAtTypeName==="BlendShape"?1:10,h=this._v0ImportDegreeMap(c.lookAtHorizontalInner,u),d=this._v0ImportDegreeMap(c.lookAtHorizontalOuter,u),f=this._v0ImportDegreeMap(c.lookAtVerticalDown,u),p=this._v0ImportDegreeMap(c.lookAtVerticalUp,u),_;c.lookAtTypeName==="BlendShape"?_=new Wu(t,h,d,f,p):_=new hl(e,h,d,f,p);let g=this._importLookAt(e,_);return c.firstPersonBoneOffset?g.offsetFromHeadBone.set((r=c.firstPersonBoneOffset.x)!=null?r:0,(s=c.firstPersonBoneOffset.y)!=null?s:.06,-((o=c.firstPersonBoneOffset.z)!=null?o:0)):g.offsetFromHeadBone.set(0,.06,0),g.faceFront.set(0,0,-1),_ instanceof hl&&_.faceFront.set(0,0,-1),g})}_v0ImportDegreeMap(i,e){var t,n;let r=i==null?void 0:i.curve;JSON.stringify(r)!=="[0,0,0,1,1,1,1,0]"&&console.warn("Curves of LookAtDegreeMap defined in VRM 0.0 are not supported");let s=(t=i==null?void 0:i.xRange)!=null?t:90,o=(n=i==null?void 0:i.yRange)!=null?n:e;return s<ll&&(console.warn("VRMLookAtLoaderPlugin: xRange of a degree map is too small. Consider reviewing the degree map!"),s=ll),new Wf(s,o)}_importLookAt(i,e){let t=new Vy(i,e);if(this.helperRoot){let n=new Ny(t);this.helperRoot.add(n),n.renderOrder=this.helperRoot.renderOrder}return t}};function Xy(i,e){return typeof i!="string"||i===""?"":(/^https?:\/\//i.test(e)&&/^\//.test(i)&&(e=e.replace(/(^https?:\/\/[^/]+).*/i,"$1")),/^(https?:)?\/\//i.test(i)||/^data:.*,.*$/i.test(i)||/^blob:.*$/i.test(i)?i:e+i)}var qy=new Set(["1.0","1.0-beta"]),Yy=class{get name(){return"VRMMetaLoaderPlugin"}constructor(i,e){var t,n,r;this.parser=i,this.needThumbnailImage=(t=e==null?void 0:e.needThumbnailImage)!=null?t:!1,this.acceptLicenseUrls=(n=e==null?void 0:e.acceptLicenseUrls)!=null?n:["https://vrm.dev/licenses/1.0/"],this.acceptV0Meta=(r=e==null?void 0:e.acceptV0Meta)!=null?r:!0}afterRoot(i){return it(this,null,function*(){i.userData.vrmMeta=yield this._import(i)})}_import(i){return it(this,null,function*(){let e=yield this._v1Import(i);if(e!=null)return e;let t=yield this._v0Import(i);return t!=null?t:null})}_v1Import(i){return it(this,null,function*(){var e,t,n;let r=this.parser.json;if(!(((e=r.extensionsUsed)==null?void 0:e.indexOf("VRMC_vrm"))!==-1))return null;let o=(t=r.extensions)==null?void 0:t.VRMC_vrm;if(o==null)return null;let a=o.specVersion;if(!qy.has(a))return console.warn(`VRMMetaLoaderPlugin: Unknown VRMC_vrm specVersion "${a}"`),null;let l=o.meta;if(!l)return null;let c=l.licenseUrl;if(!new Set(this.acceptLicenseUrls).has(c))throw new Error(`VRMMetaLoaderPlugin: The license url "${c}" is not accepted`);let h;return this.needThumbnailImage&&l.thumbnailImage!=null&&(h=(n=yield this._extractGLTFImage(l.thumbnailImage))!=null?n:void 0),{metaVersion:"1",name:l.name,version:l.version,authors:l.authors,copyrightInformation:l.copyrightInformation,contactInformation:l.contactInformation,references:l.references,thirdPartyLicenses:l.thirdPartyLicenses,thumbnailImage:h,licenseUrl:l.licenseUrl,avatarPermission:l.avatarPermission,allowExcessivelyViolentUsage:l.allowExcessivelyViolentUsage,allowExcessivelySexualUsage:l.allowExcessivelySexualUsage,commercialUsage:l.commercialUsage,allowPoliticalOrReligiousUsage:l.allowPoliticalOrReligiousUsage,allowAntisocialOrHateUsage:l.allowAntisocialOrHateUsage,creditNotation:l.creditNotation,allowRedistribution:l.allowRedistribution,modification:l.modification,otherLicenseUrl:l.otherLicenseUrl}})}_v0Import(i){return it(this,null,function*(){var e;let n=(e=this.parser.json.extensions)==null?void 0:e.VRM;if(!n)return null;let r=n.meta;if(!r)return null;if(!this.acceptV0Meta)throw new Error("VRMMetaLoaderPlugin: Attempted to load VRM0.0 meta but acceptV0Meta is false");let s;return this.needThumbnailImage&&r.texture!=null&&r.texture!==-1&&(s=yield this.parser.getDependency("texture",r.texture)),{metaVersion:"0",allowedUserName:r.allowedUserName,author:r.author,commercialUssageName:r.commercialUssageName,contactInformation:r.contactInformation,licenseName:r.licenseName,otherLicenseUrl:r.otherLicenseUrl,otherPermissionUrl:r.otherPermissionUrl,reference:r.reference,sexualUssageName:r.sexualUssageName,texture:s!=null?s:void 0,title:r.title,version:r.version,violentUssageName:r.violentUssageName}})}_extractGLTFImage(i){return it(this,null,function*(){var e;let n=(e=this.parser.json.images)==null?void 0:e[i];if(n==null)return console.warn(`VRMMetaLoaderPlugin: Attempt to use images[${i}] of glTF as a thumbnail but the image doesn't exist`),null;let r=n.uri;if(n.bufferView!=null){let o=yield this.parser.getDependency("bufferView",n.bufferView),a=new Blob([o],{type:n.mimeType});r=URL.createObjectURL(a)}return r==null?(console.warn(`VRMMetaLoaderPlugin: Attempt to use images[${i}] of glTF as a thumbnail but the image couldn't load properly`),null):yield new Br().loadAsync(Xy(r,this.parser.options.path)).catch(o=>(console.error(o),console.warn("VRMMetaLoaderPlugin: Failed to load a thumbnail image"),null))})}},Zy=class{constructor(i){this.scene=i.scene,this.meta=i.meta,this.humanoid=i.humanoid,this.expressionManager=i.expressionManager,this.firstPerson=i.firstPerson,this.lookAt=i.lookAt}update(i){this.humanoid.update(),this.lookAt&&this.lookAt.update(i),this.expressionManager&&this.expressionManager.update()}};var $y=class extends Zy{constructor(i){super(i),this.materials=i.materials,this.springBoneManager=i.springBoneManager,this.nodeConstraintManager=i.nodeConstraintManager}update(i){super.update(i),this.nodeConstraintManager&&this.nodeConstraintManager.update(),this.springBoneManager&&this.springBoneManager.update(i),this.materials&&this.materials.forEach(e=>{e.update&&e.update(i)})}},jy=Object.defineProperty,Xf=Object.getOwnPropertySymbols,Ky=Object.prototype.hasOwnProperty,Jy=Object.prototype.propertyIsEnumerable,qf=(i,e,t)=>e in i?jy(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t,Yf=(i,e)=>{for(var t in e||(e={}))Ky.call(e,t)&&qf(i,t,e[t]);if(Xf)for(var t of Xf(e))Jy.call(e,t)&&qf(i,t,e[t]);return i},rr=(i,e,t)=>new Promise((n,r)=>{var s=l=>{try{a(t.next(l))}catch(c){r(c)}},o=l=>{try{a(t.throw(l))}catch(c){r(c)}},a=l=>l.done?n(l.value):Promise.resolve(l.value).then(s,o);a((t=t.apply(i,e)).next())}),Qy={"":3e3,srgb:3001};function eM(i,e){parseInt("179",10)>=152?i.colorSpace=e:i.encoding=Qy[e]}var tM=class{get pending(){return Promise.all(this._pendings)}constructor(i,e){this._parser=i,this._materialParams=e,this._pendings=[]}assignPrimitive(i,e){e!=null&&(this._materialParams[i]=e)}assignColor(i,e,t){if(e!=null){let n=new fe().fromArray(e);t&&n.convertSRGBToLinear(),this._materialParams[i]=n}}assignTexture(i,e,t){return rr(this,null,function*(){let n=rr(this,null,function*(){if(e!=null){let r=yield this._parser.assignTexture(this._materialParams,i,e);if(r==null){console.warn("GLTFMToonMaterialParamsAssignHelper: Failed to load texture. The rendering result may be wrong");return}t&&eM(r,"srgb")}});return this._pendings.push(n),n})}assignTextureByIndex(i,e,t){return rr(this,null,function*(){return this.assignTexture(i,e!=null?{index:e}:void 0,t)})}},nM=`// #define PHONG

varying vec3 vViewPosition;

#ifndef FLAT_SHADED
  varying vec3 vNormal;
#endif

#include <common>

// #include <uv_pars_vertex>
#ifdef MTOON_USE_UV
  varying vec2 vUv;

  // COMPAT: pre-r151 uses a common uvTransform
  #if THREE_VRM_THREE_REVISION < 151
    uniform mat3 uvTransform;
  #endif
#endif

// #include <uv2_pars_vertex>
// COMAPT: pre-r151 uses uv2 for lightMap and aoMap
#if THREE_VRM_THREE_REVISION < 151
  #if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
    attribute vec2 uv2;
    varying vec2 vUv2;
    uniform mat3 uv2Transform;
  #endif
#endif

// #include <displacementmap_pars_vertex>
// #include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

#ifdef USE_OUTLINEWIDTHMULTIPLYTEXTURE
  uniform sampler2D outlineWidthMultiplyTexture;
  uniform mat3 outlineWidthMultiplyTextureUvTransform;
#endif

uniform float outlineWidthFactor;

void main() {

  // #include <uv_vertex>
  #ifdef MTOON_USE_UV
    // COMPAT: pre-r151 uses a common uvTransform
    #if THREE_VRM_THREE_REVISION >= 151
      vUv = uv;
    #else
      vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
    #endif
  #endif

  // #include <uv2_vertex>
  // COMAPT: pre-r151 uses uv2 for lightMap and aoMap
  #if THREE_VRM_THREE_REVISION < 151
    #if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
      vUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;
    #endif
  #endif

  #include <color_vertex>

  #include <beginnormal_vertex>
  #include <morphnormal_vertex>
  #include <skinbase_vertex>
  #include <skinnormal_vertex>

  // we need this to compute the outline properly
  objectNormal = normalize( objectNormal );

  #include <defaultnormal_vertex>

  #ifndef FLAT_SHADED // Normal computed with derivatives when FLAT_SHADED
    vNormal = normalize( transformedNormal );
  #endif

  #include <begin_vertex>

  #include <morphtarget_vertex>
  #include <skinning_vertex>
  // #include <displacementmap_vertex>
  #include <project_vertex>
  #include <logdepthbuf_vertex>
  #include <clipping_planes_vertex>

  vViewPosition = - mvPosition.xyz;

  #ifdef OUTLINE
    float worldNormalLength = length( transformedNormal );
    vec3 outlineOffset = outlineWidthFactor * worldNormalLength * objectNormal;

    #ifdef USE_OUTLINEWIDTHMULTIPLYTEXTURE
      vec2 outlineWidthMultiplyTextureUv = ( outlineWidthMultiplyTextureUvTransform * vec3( vUv, 1 ) ).xy;
      float outlineTex = texture2D( outlineWidthMultiplyTexture, outlineWidthMultiplyTextureUv ).g;
      outlineOffset *= outlineTex;
    #endif

    #ifdef OUTLINE_WIDTH_SCREEN
      outlineOffset *= vViewPosition.z / projectionMatrix[ 1 ].y;
    #endif

    gl_Position = projectionMatrix * modelViewMatrix * vec4( outlineOffset + transformed, 1.0 );

    gl_Position.z += 1E-6 * gl_Position.w; // anti-artifact magic
  #endif

  #include <worldpos_vertex>
  // #include <envmap_vertex>
  #include <shadowmap_vertex>
  #include <fog_vertex>

}`,iM=`// #define PHONG

uniform vec3 litFactor;

uniform float opacity;

uniform vec3 shadeColorFactor;
#ifdef USE_SHADEMULTIPLYTEXTURE
  uniform sampler2D shadeMultiplyTexture;
  uniform mat3 shadeMultiplyTextureUvTransform;
#endif

uniform float shadingShiftFactor;
uniform float shadingToonyFactor;

#ifdef USE_SHADINGSHIFTTEXTURE
  uniform sampler2D shadingShiftTexture;
  uniform mat3 shadingShiftTextureUvTransform;
  uniform float shadingShiftTextureScale;
#endif

uniform float giEqualizationFactor;

uniform vec3 parametricRimColorFactor;
#ifdef USE_RIMMULTIPLYTEXTURE
  uniform sampler2D rimMultiplyTexture;
  uniform mat3 rimMultiplyTextureUvTransform;
#endif
uniform float rimLightingMixFactor;
uniform float parametricRimFresnelPowerFactor;
uniform float parametricRimLiftFactor;

#ifdef USE_MATCAPTEXTURE
  uniform vec3 matcapFactor;
  uniform sampler2D matcapTexture;
  uniform mat3 matcapTextureUvTransform;
#endif

uniform vec3 emissive;
uniform float emissiveIntensity;

uniform vec3 outlineColorFactor;
uniform float outlineLightingMixFactor;

#ifdef USE_UVANIMATIONMASKTEXTURE
  uniform sampler2D uvAnimationMaskTexture;
  uniform mat3 uvAnimationMaskTextureUvTransform;
#endif

uniform float uvAnimationScrollXOffset;
uniform float uvAnimationScrollYOffset;
uniform float uvAnimationRotationPhase;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>

// #include <uv_pars_fragment>
#if ( defined( MTOON_USE_UV ) && !defined( MTOON_UVS_VERTEX_ONLY ) )
  varying vec2 vUv;
#endif

// #include <uv2_pars_fragment>
// COMAPT: pre-r151 uses uv2 for lightMap and aoMap
#if THREE_VRM_THREE_REVISION < 151
  #if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
    varying vec2 vUv2;
  #endif
#endif

#include <map_pars_fragment>

#ifdef USE_MAP
  uniform mat3 mapUvTransform;
#endif

// #include <alphamap_pars_fragment>

#include <alphatest_pars_fragment>

#include <aomap_pars_fragment>
// #include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>

#ifdef USE_EMISSIVEMAP
  uniform mat3 emissiveMapUvTransform;
#endif

// #include <envmap_common_pars_fragment>
// #include <envmap_pars_fragment>
// #include <cube_uv_reflection_fragment>
#include <fog_pars_fragment>

// #include <bsdfs>
// COMPAT: pre-r151 doesn't have BRDF_Lambert in <common>
#if THREE_VRM_THREE_REVISION < 151
  vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
    return RECIPROCAL_PI * diffuseColor;
  }
#endif

#include <lights_pars_begin>

#include <normal_pars_fragment>

// #include <lights_phong_pars_fragment>
varying vec3 vViewPosition;

struct MToonMaterial {
  vec3 diffuseColor;
  vec3 shadeColor;
  float shadingShift;
};

float linearstep( float a, float b, float t ) {
  return clamp( ( t - a ) / ( b - a ), 0.0, 1.0 );
}

/**
 * Convert NdotL into toon shading factor using shadingShift and shadingToony
 */
float getShading(
  const in float dotNL,
  const in float shadow,
  const in float shadingShift
) {
  float shading = dotNL;
  shading = shading + shadingShift;
  shading = linearstep( -1.0 + shadingToonyFactor, 1.0 - shadingToonyFactor, shading );
  shading *= shadow;
  return shading;
}

/**
 * Mix diffuseColor and shadeColor using shading factor and light color
 */
vec3 getDiffuse(
  const in MToonMaterial material,
  const in float shading,
  in vec3 lightColor
) {
  #ifdef DEBUG_LITSHADERATE
    return vec3( BRDF_Lambert( shading * lightColor ) );
  #endif

  vec3 col = lightColor * BRDF_Lambert( mix( material.shadeColor, material.diffuseColor, shading ) );

  // The "comment out if you want to PBR absolutely" line
  #ifdef V0_COMPAT_SHADE
    col = min( col, material.diffuseColor );
  #endif

  return col;
}

// COMPAT: pre-r156 uses a struct GeometricContext
#if THREE_VRM_THREE_REVISION >= 157
  void RE_Direct_MToon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in MToonMaterial material, const in float shadow, inout ReflectedLight reflectedLight ) {
    float dotNL = clamp( dot( geometryNormal, directLight.direction ), -1.0, 1.0 );
    vec3 irradiance = directLight.color;

    // directSpecular will be used for rim lighting, not an actual specular
    reflectedLight.directSpecular += irradiance;

    irradiance *= dotNL;

    float shading = getShading( dotNL, shadow, material.shadingShift );

    // toon shaded diffuse
    reflectedLight.directDiffuse += getDiffuse( material, shading, directLight.color );
  }

  void RE_IndirectDiffuse_MToon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in MToonMaterial material, inout ReflectedLight reflectedLight ) {
    // indirect diffuse will use diffuseColor, no shadeColor involved
    reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

    // directSpecular will be used for rim lighting, not an actual specular
    reflectedLight.directSpecular += irradiance;
  }
#else
  void RE_Direct_MToon( const in IncidentLight directLight, const in GeometricContext geometry, const in MToonMaterial material, const in float shadow, inout ReflectedLight reflectedLight ) {
    float dotNL = clamp( dot( geometry.normal, directLight.direction ), -1.0, 1.0 );
    vec3 irradiance = directLight.color;

    // directSpecular will be used for rim lighting, not an actual specular
    reflectedLight.directSpecular += irradiance;

    irradiance *= dotNL;

    float shading = getShading( dotNL, shadow, material.shadingShift );

    // toon shaded diffuse
    reflectedLight.directDiffuse += getDiffuse( material, shading, directLight.color );
  }

  void RE_IndirectDiffuse_MToon( const in vec3 irradiance, const in GeometricContext geometry, const in MToonMaterial material, inout ReflectedLight reflectedLight ) {
    // indirect diffuse will use diffuseColor, no shadeColor involved
    reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

    // directSpecular will be used for rim lighting, not an actual specular
    reflectedLight.directSpecular += irradiance;
  }
#endif

#define RE_Direct RE_Direct_MToon
#define RE_IndirectDiffuse RE_IndirectDiffuse_MToon
#define Material_LightProbeLOD( material ) (0)

#include <shadowmap_pars_fragment>
// #include <bumpmap_pars_fragment>

// #include <normalmap_pars_fragment>
#ifdef USE_NORMALMAP

  uniform sampler2D normalMap;
  uniform mat3 normalMapUvTransform;
  uniform vec2 normalScale;

#endif

// COMPAT: pre-r151
// USE_NORMALMAP_OBJECTSPACE used to be OBJECTSPACE_NORMALMAP in pre-r151
#if defined( USE_NORMALMAP_OBJECTSPACE ) || defined( OBJECTSPACE_NORMALMAP )

  uniform mat3 normalMatrix;

#endif

// COMPAT: pre-r151
// USE_NORMALMAP_TANGENTSPACE used to be TANGENTSPACE_NORMALMAP in pre-r151
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( TANGENTSPACE_NORMALMAP ) )

  // Per-Pixel Tangent Space Normal Mapping
  // http://hacksoflife.blogspot.ch/2009/11/per-pixel-tangent-space-normal-mapping.html

  // three-vrm specific change: it requires \`uv\` as an input in order to support uv scrolls

  // Temporary compat against shader change @ Three.js r126, r151
  #if THREE_VRM_THREE_REVISION >= 151

    mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {

      vec3 q0 = dFdx( eye_pos.xyz );
      vec3 q1 = dFdy( eye_pos.xyz );
      vec2 st0 = dFdx( uv.st );
      vec2 st1 = dFdy( uv.st );

      vec3 N = surf_norm;

      vec3 q1perp = cross( q1, N );
      vec3 q0perp = cross( N, q0 );

      vec3 T = q1perp * st0.x + q0perp * st1.x;
      vec3 B = q1perp * st0.y + q0perp * st1.y;

      float det = max( dot( T, T ), dot( B, B ) );
      float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );

      return mat3( T * scale, B * scale, N );

    }

  #else

    vec3 perturbNormal2Arb( vec2 uv, vec3 eye_pos, vec3 surf_norm, vec3 mapN, float faceDirection ) {

      vec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );
      vec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );
      vec2 st0 = dFdx( uv.st );
      vec2 st1 = dFdy( uv.st );

      vec3 N = normalize( surf_norm );

      vec3 q1perp = cross( q1, N );
      vec3 q0perp = cross( N, q0 );

      vec3 T = q1perp * st0.x + q0perp * st1.x;
      vec3 B = q1perp * st0.y + q0perp * st1.y;

      // three-vrm specific change: Workaround for the issue that happens when delta of uv = 0.0
      // TODO: Is this still required? Or shall I make a PR about it?
      if ( length( T ) == 0.0 || length( B ) == 0.0 ) {
        return surf_norm;
      }

      float det = max( dot( T, T ), dot( B, B ) );
      float scale = ( det == 0.0 ) ? 0.0 : faceDirection * inversesqrt( det );

      return normalize( T * ( mapN.x * scale ) + B * ( mapN.y * scale ) + N * mapN.z );

    }

  #endif

#endif

// #include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

// == post correction ==========================================================
void postCorrection() {
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
  #include <fog_fragment>
  #include <premultiplied_alpha_fragment>
  #include <dithering_fragment>
}

// == main procedure ===========================================================
void main() {
  #include <clipping_planes_fragment>

  vec2 uv = vec2(0.5, 0.5);

  #if ( defined( MTOON_USE_UV ) && !defined( MTOON_UVS_VERTEX_ONLY ) )
    uv = vUv;

    float uvAnimMask = 1.0;
    #ifdef USE_UVANIMATIONMASKTEXTURE
      vec2 uvAnimationMaskTextureUv = ( uvAnimationMaskTextureUvTransform * vec3( uv, 1 ) ).xy;
      uvAnimMask = texture2D( uvAnimationMaskTexture, uvAnimationMaskTextureUv ).b;
    #endif

    float uvRotCos = cos( uvAnimationRotationPhase * uvAnimMask );
    float uvRotSin = sin( uvAnimationRotationPhase * uvAnimMask );
    uv = mat2( uvRotCos, -uvRotSin, uvRotSin, uvRotCos ) * ( uv - 0.5 ) + 0.5;
    uv = uv + vec2( uvAnimationScrollXOffset, uvAnimationScrollYOffset ) * uvAnimMask;
  #endif

  #ifdef DEBUG_UV
    gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
    #if ( defined( MTOON_USE_UV ) && !defined( MTOON_UVS_VERTEX_ONLY ) )
      gl_FragColor = vec4( uv, 0.0, 1.0 );
    #endif
    return;
  #endif

  vec4 diffuseColor = vec4( litFactor, opacity );
  ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
  vec3 totalEmissiveRadiance = emissive * emissiveIntensity;

  #include <logdepthbuf_fragment>

  // #include <map_fragment>
  #ifdef USE_MAP
    vec2 mapUv = ( mapUvTransform * vec3( uv, 1 ) ).xy;
    vec4 sampledDiffuseColor = texture2D( map, mapUv );
    #ifdef DECODE_VIDEO_TEXTURE
      sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
    #endif
    diffuseColor *= sampledDiffuseColor;
  #endif

  // #include <color_fragment>
  #if ( defined( USE_COLOR ) && !defined( IGNORE_VERTEX_COLOR ) )
    diffuseColor.rgb *= vColor;
  #endif

  // #include <alphamap_fragment>

  #include <alphatest_fragment>

  // #include <specularmap_fragment>

  // #include <normal_fragment_begin>
  float faceDirection = gl_FrontFacing ? 1.0 : -1.0;

  #ifdef FLAT_SHADED

    vec3 fdx = dFdx( vViewPosition );
    vec3 fdy = dFdy( vViewPosition );
    vec3 normal = normalize( cross( fdx, fdy ) );

  #else

    vec3 normal = normalize( vNormal );

    #ifdef DOUBLE_SIDED

      normal *= faceDirection;

    #endif

  #endif

  #ifdef USE_NORMALMAP

    vec2 normalMapUv = ( normalMapUvTransform * vec3( uv, 1 ) ).xy;

  #endif

  #ifdef USE_NORMALMAP_TANGENTSPACE

    #ifdef USE_TANGENT

      mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );

    #else

      mat3 tbn = getTangentFrame( - vViewPosition, normal, normalMapUv );

    #endif

    #if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )

      tbn[0] *= faceDirection;
      tbn[1] *= faceDirection;

    #endif

  #endif

  #ifdef USE_CLEARCOAT_NORMALMAP

    #ifdef USE_TANGENT

      mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );

    #else

      mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );

    #endif

    #if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )

      tbn2[0] *= faceDirection;
      tbn2[1] *= faceDirection;

    #endif

  #endif

  // non perturbed normal for clearcoat among others

  vec3 nonPerturbedNormal = normal;

  #ifdef OUTLINE
    normal *= -1.0;
  #endif

  // #include <normal_fragment_maps>

  // COMPAT: pre-r151
  // USE_NORMALMAP_OBJECTSPACE used to be OBJECTSPACE_NORMALMAP in pre-r151
  #if defined( USE_NORMALMAP_OBJECTSPACE ) || defined( OBJECTSPACE_NORMALMAP )

    normal = texture2D( normalMap, normalMapUv ).xyz * 2.0 - 1.0; // overrides both flatShading and attribute normals

    #ifdef FLIP_SIDED

      normal = - normal;

    #endif

    #ifdef DOUBLE_SIDED

      normal = normal * faceDirection;

    #endif

    normal = normalize( normalMatrix * normal );

  // COMPAT: pre-r151
  // USE_NORMALMAP_TANGENTSPACE used to be TANGENTSPACE_NORMALMAP in pre-r151
  #elif defined( USE_NORMALMAP_TANGENTSPACE ) || defined( TANGENTSPACE_NORMALMAP )

    vec3 mapN = texture2D( normalMap, normalMapUv ).xyz * 2.0 - 1.0;
    mapN.xy *= normalScale;

    // COMPAT: pre-r151
    #if THREE_VRM_THREE_REVISION >= 151 || defined( USE_TANGENT )

      normal = normalize( tbn * mapN );

    #else

      normal = perturbNormal2Arb( uv, -vViewPosition, normal, mapN, faceDirection );

    #endif

  #endif

  // #include <emissivemap_fragment>
  #ifdef USE_EMISSIVEMAP
    vec2 emissiveMapUv = ( emissiveMapUvTransform * vec3( uv, 1 ) ).xy;
    totalEmissiveRadiance *= texture2D( emissiveMap, emissiveMapUv ).rgb;
  #endif

  #ifdef DEBUG_NORMAL
    gl_FragColor = vec4( 0.5 + 0.5 * normal, 1.0 );
    return;
  #endif

  // -- MToon: lighting --------------------------------------------------------
  // accumulation
  // #include <lights_phong_fragment>
  MToonMaterial material;

  material.diffuseColor = diffuseColor.rgb;

  material.shadeColor = shadeColorFactor;
  #ifdef USE_SHADEMULTIPLYTEXTURE
    vec2 shadeMultiplyTextureUv = ( shadeMultiplyTextureUvTransform * vec3( uv, 1 ) ).xy;
    material.shadeColor *= texture2D( shadeMultiplyTexture, shadeMultiplyTextureUv ).rgb;
  #endif

  #if ( defined( USE_COLOR ) && !defined( IGNORE_VERTEX_COLOR ) )
    material.shadeColor.rgb *= vColor;
  #endif

  material.shadingShift = shadingShiftFactor;
  #ifdef USE_SHADINGSHIFTTEXTURE
    vec2 shadingShiftTextureUv = ( shadingShiftTextureUvTransform * vec3( uv, 1 ) ).xy;
    material.shadingShift += texture2D( shadingShiftTexture, shadingShiftTextureUv ).r * shadingShiftTextureScale;
  #endif

  // #include <lights_fragment_begin>

  // MToon Specific changes:
  // Since we want to take shadows into account of shading instead of irradiance,
  // we had to modify the codes that multiplies the results of shadowmap into color of direct lights.

  // COMPAT: pre-r156 uses a struct GeometricContext
  #if THREE_VRM_THREE_REVISION >= 157
    vec3 geometryPosition = - vViewPosition;
    vec3 geometryNormal = normal;
    vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );

    vec3 geometryClearcoatNormal;

    #ifdef USE_CLEARCOAT

      geometryClearcoatNormal = clearcoatNormal;

    #endif
  #else
    GeometricContext geometry;

    geometry.position = - vViewPosition;
    geometry.normal = normal;
    geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );

    #ifdef USE_CLEARCOAT

      geometry.clearcoatNormal = clearcoatNormal;

    #endif
  #endif

  IncidentLight directLight;

  // since these variables will be used in unrolled loop, we have to define in prior
  float shadow;

  #if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )

    PointLight pointLight;
    #if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
    PointLightShadow pointLightShadow;
    #endif

    #pragma unroll_loop_start
    for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {

      pointLight = pointLights[ i ];

      // COMPAT: pre-r156 uses a struct GeometricContext
      #if THREE_VRM_THREE_REVISION >= 157
        getPointLightInfo( pointLight, geometryPosition, directLight );
      #else
        getPointLightInfo( pointLight, geometry, directLight );
      #endif

      shadow = 1.0;
      #if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
      pointLightShadow = pointLightShadows[ i ];
      // COMPAT: pre-r166
      // r166 introduced shadowIntensity
      #if THREE_VRM_THREE_REVISION >= 166
        shadow = all( bvec2( directLight.visible, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
      #else
        shadow = all( bvec2( directLight.visible, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
      #endif
      #endif

      // COMPAT: pre-r156 uses a struct GeometricContext
      #if THREE_VRM_THREE_REVISION >= 157
        RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, shadow, reflectedLight );
      #else
        RE_Direct( directLight, geometry, material, shadow, reflectedLight );
      #endif

    }
    #pragma unroll_loop_end

  #endif

  #if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )

    SpotLight spotLight;
    // COMPAT: pre-r144 uses NUM_SPOT_LIGHT_SHADOWS, r144+ uses NUM_SPOT_LIGHT_COORDS
    #if THREE_VRM_THREE_REVISION >= 144
      #if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_COORDS > 0
      SpotLightShadow spotLightShadow;
      #endif
    #elif defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
    SpotLightShadow spotLightShadow;
    #endif

    #pragma unroll_loop_start
    for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {

      spotLight = spotLights[ i ];

      // COMPAT: pre-r156 uses a struct GeometricContext
      #if THREE_VRM_THREE_REVISION >= 157
        getSpotLightInfo( spotLight, geometryPosition, directLight );
      #else
        getSpotLightInfo( spotLight, geometry, directLight );
      #endif

      shadow = 1.0;
      // COMPAT: pre-r144 uses NUM_SPOT_LIGHT_SHADOWS and vSpotShadowCoord, r144+ uses NUM_SPOT_LIGHT_COORDS and vSpotLightCoord
      // COMPAT: pre-r166 does not have shadowIntensity, r166+ has shadowIntensity
      #if THREE_VRM_THREE_REVISION >= 166
        #if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_COORDS )
        spotLightShadow = spotLightShadows[ i ];
        shadow = all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
        #endif
      #elif THREE_VRM_THREE_REVISION >= 144
        #if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_COORDS )
        spotLightShadow = spotLightShadows[ i ];
        shadow = all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
        #endif
      #elif defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
      spotLightShadow = spotLightShadows[ i ];
      shadow = all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;
      #endif

      // COMPAT: pre-r156 uses a struct GeometricContext
      #if THREE_VRM_THREE_REVISION >= 157
        RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, shadow, reflectedLight );
      #else
        RE_Direct( directLight, geometry, material, shadow, reflectedLight );
      #endif

    }
    #pragma unroll_loop_end

  #endif

  #if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )

    DirectionalLight directionalLight;
    #if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
    DirectionalLightShadow directionalLightShadow;
    #endif

    #pragma unroll_loop_start
    for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {

      directionalLight = directionalLights[ i ];

      // COMPAT: pre-r156 uses a struct GeometricContext
      #if THREE_VRM_THREE_REVISION >= 157
        getDirectionalLightInfo( directionalLight, directLight );
      #else
        getDirectionalLightInfo( directionalLight, geometry, directLight );
      #endif

      shadow = 1.0;
      #if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
      directionalLightShadow = directionalLightShadows[ i ];
      // COMPAT: pre-r166
      // r166 introduced shadowIntensity
      #if THREE_VRM_THREE_REVISION >= 166
        shadow = all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
      #else
        shadow = all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
      #endif
      #endif

      // COMPAT: pre-r156 uses a struct GeometricContext
      #if THREE_VRM_THREE_REVISION >= 157
        RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, shadow, reflectedLight );
      #else
        RE_Direct( directLight, geometry, material, shadow, reflectedLight );
      #endif

    }
    #pragma unroll_loop_end

  #endif

  // #if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )

  //   RectAreaLight rectAreaLight;

  //   #pragma unroll_loop_start
  //   for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {

  //     rectAreaLight = rectAreaLights[ i ];
  //     RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );

  //   }
  //   #pragma unroll_loop_end

  // #endif

  #if defined( RE_IndirectDiffuse )

    vec3 iblIrradiance = vec3( 0.0 );

    vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );

    // COMPAT: pre-r156 uses a struct GeometricContext
    // COMPAT: pre-r156 doesn't have a define USE_LIGHT_PROBES
    #if THREE_VRM_THREE_REVISION >= 157
      #if defined( USE_LIGHT_PROBES )
        irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
      #endif
    #else
      irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );
    #endif

    #if ( NUM_HEMI_LIGHTS > 0 )

      #pragma unroll_loop_start
      for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {

        // COMPAT: pre-r156 uses a struct GeometricContext
        #if THREE_VRM_THREE_REVISION >= 157
          irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
        #else
          irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );
        #endif

      }
      #pragma unroll_loop_end

    #endif

  #endif

  // #if defined( RE_IndirectSpecular )

  //   vec3 radiance = vec3( 0.0 );
  //   vec3 clearcoatRadiance = vec3( 0.0 );

  // #endif

  #include <lights_fragment_maps>
  #include <lights_fragment_end>

  // modulation
  #include <aomap_fragment>

  vec3 col = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;

  #ifdef DEBUG_LITSHADERATE
    gl_FragColor = vec4( col, diffuseColor.a );
    postCorrection();
    return;
  #endif

  // -- MToon: rim lighting -----------------------------------------
  vec3 viewDir = normalize( vViewPosition );

  #ifndef PHYSICALLY_CORRECT_LIGHTS
    reflectedLight.directSpecular /= PI;
  #endif
  vec3 rimMix = mix( vec3( 1.0 ), reflectedLight.directSpecular, rimLightingMixFactor );

  vec3 rim = parametricRimColorFactor * pow( saturate( 1.0 - dot( viewDir, normal ) + parametricRimLiftFactor ), parametricRimFresnelPowerFactor );

  #ifdef USE_MATCAPTEXTURE
    {
      vec3 x = normalize( vec3( viewDir.z, 0.0, -viewDir.x ) );
      vec3 y = cross( viewDir, x ); // guaranteed to be normalized
      vec2 sphereUv = 0.5 + 0.5 * vec2( dot( x, normal ), -dot( y, normal ) );
      sphereUv = ( matcapTextureUvTransform * vec3( sphereUv, 1 ) ).xy;
      vec3 matcap = texture2D( matcapTexture, sphereUv ).rgb;
      rim += matcapFactor * matcap;
    }
  #endif

  #ifdef USE_RIMMULTIPLYTEXTURE
    vec2 rimMultiplyTextureUv = ( rimMultiplyTextureUvTransform * vec3( uv, 1 ) ).xy;
    rim *= texture2D( rimMultiplyTexture, rimMultiplyTextureUv ).rgb;
  #endif

  col += rimMix * rim;

  // -- MToon: Emission --------------------------------------------------------
  col += totalEmissiveRadiance;

  // #include <envmap_fragment>

  // -- Almost done! -----------------------------------------------------------
  #if defined( OUTLINE )
    col = outlineColorFactor.rgb * mix( vec3( 1.0 ), col, outlineLightingMixFactor );
  #endif

  #ifdef OPAQUE
    diffuseColor.a = 1.0;
  #endif

  gl_FragColor = vec4( col, diffuseColor.a );
  postCorrection();
}
`,rM={None:"none",Normal:"normal",LitShadeRate:"litShadeRate",UV:"uv"},Zf={None:"none",WorldCoordinates:"worldCoordinates",ScreenCoordinates:"screenCoordinates"},sM={3e3:"",3001:"srgb"};function Nu(i){return parseInt("179",10)>=152?i.colorSpace:sM[i.encoding]}var oM=class extends tn{constructor(i={}){var e;super({vertexShader:nM,fragmentShader:iM}),this.uvAnimationScrollXSpeedFactor=0,this.uvAnimationScrollYSpeedFactor=0,this.uvAnimationRotationSpeedFactor=0,this.fog=!0,this.normalMapType=js,this._ignoreVertexColor=!0,this._v0CompatShade=!1,this._debugMode=rM.None,this._outlineWidthMode=Zf.None,this._isOutline=!1,i.transparentWithZWrite&&(i.depthWrite=!0),delete i.transparentWithZWrite,i.fog=!0,i.lights=!0,i.clipping=!0,this.uniforms=ja.merge([ae.common,ae.normalmap,ae.emissivemap,ae.fog,ae.lights,{litFactor:{value:new fe(1,1,1)},mapUvTransform:{value:new Ce},colorAlpha:{value:1},normalMapUvTransform:{value:new Ce},shadeColorFactor:{value:new fe(0,0,0)},shadeMultiplyTexture:{value:null},shadeMultiplyTextureUvTransform:{value:new Ce},shadingShiftFactor:{value:0},shadingShiftTexture:{value:null},shadingShiftTextureUvTransform:{value:new Ce},shadingShiftTextureScale:{value:1},shadingToonyFactor:{value:.9},giEqualizationFactor:{value:.9},matcapFactor:{value:new fe(1,1,1)},matcapTexture:{value:null},matcapTextureUvTransform:{value:new Ce},parametricRimColorFactor:{value:new fe(0,0,0)},rimMultiplyTexture:{value:null},rimMultiplyTextureUvTransform:{value:new Ce},rimLightingMixFactor:{value:1},parametricRimFresnelPowerFactor:{value:5},parametricRimLiftFactor:{value:0},emissive:{value:new fe(0,0,0)},emissiveIntensity:{value:1},emissiveMapUvTransform:{value:new Ce},outlineWidthMultiplyTexture:{value:null},outlineWidthMultiplyTextureUvTransform:{value:new Ce},outlineWidthFactor:{value:0},outlineColorFactor:{value:new fe(0,0,0)},outlineLightingMixFactor:{value:1},uvAnimationMaskTexture:{value:null},uvAnimationMaskTextureUvTransform:{value:new Ce},uvAnimationScrollXOffset:{value:0},uvAnimationScrollYOffset:{value:0},uvAnimationRotationPhase:{value:0}},(e=i.uniforms)!=null?e:{}]),this.setValues(i),this._uploadUniformsWorkaround(),this.customProgramCacheKey=()=>[...Object.entries(this._generateDefines()).map(([t,n])=>`${t}:${n}`),this.matcapTexture?`matcapTextureColorSpace:${Nu(this.matcapTexture)}`:"",this.shadeMultiplyTexture?`shadeMultiplyTextureColorSpace:${Nu(this.shadeMultiplyTexture)}`:"",this.rimMultiplyTexture?`rimMultiplyTextureColorSpace:${Nu(this.rimMultiplyTexture)}`:""].join(","),this.onBeforeCompile=t=>{let n=parseInt("179",10),r=Object.entries(Yf(Yf({},this._generateDefines()),this.defines)).filter(([s,o])=>!!o).map(([s,o])=>`#define ${s} ${o}`).join(`
`)+`
`;t.vertexShader=r+t.vertexShader,t.fragmentShader=r+t.fragmentShader,n<154&&(t.fragmentShader=t.fragmentShader.replace("#include <colorspace_fragment>","#include <encodings_fragment>"))}}get color(){return this.uniforms.litFactor.value}set color(i){this.uniforms.litFactor.value=i}get map(){return this.uniforms.map.value}set map(i){this.uniforms.map.value=i}get normalMap(){return this.uniforms.normalMap.value}set normalMap(i){this.uniforms.normalMap.value=i}get normalScale(){return this.uniforms.normalScale.value}set normalScale(i){this.uniforms.normalScale.value=i}get emissive(){return this.uniforms.emissive.value}set emissive(i){this.uniforms.emissive.value=i}get emissiveIntensity(){return this.uniforms.emissiveIntensity.value}set emissiveIntensity(i){this.uniforms.emissiveIntensity.value=i}get emissiveMap(){return this.uniforms.emissiveMap.value}set emissiveMap(i){this.uniforms.emissiveMap.value=i}get shadeColorFactor(){return this.uniforms.shadeColorFactor.value}set shadeColorFactor(i){this.uniforms.shadeColorFactor.value=i}get shadeMultiplyTexture(){return this.uniforms.shadeMultiplyTexture.value}set shadeMultiplyTexture(i){this.uniforms.shadeMultiplyTexture.value=i}get shadingShiftFactor(){return this.uniforms.shadingShiftFactor.value}set shadingShiftFactor(i){this.uniforms.shadingShiftFactor.value=i}get shadingShiftTexture(){return this.uniforms.shadingShiftTexture.value}set shadingShiftTexture(i){this.uniforms.shadingShiftTexture.value=i}get shadingShiftTextureScale(){return this.uniforms.shadingShiftTextureScale.value}set shadingShiftTextureScale(i){this.uniforms.shadingShiftTextureScale.value=i}get shadingToonyFactor(){return this.uniforms.shadingToonyFactor.value}set shadingToonyFactor(i){this.uniforms.shadingToonyFactor.value=i}get giEqualizationFactor(){return this.uniforms.giEqualizationFactor.value}set giEqualizationFactor(i){this.uniforms.giEqualizationFactor.value=i}get matcapFactor(){return this.uniforms.matcapFactor.value}set matcapFactor(i){this.uniforms.matcapFactor.value=i}get matcapTexture(){return this.uniforms.matcapTexture.value}set matcapTexture(i){this.uniforms.matcapTexture.value=i}get parametricRimColorFactor(){return this.uniforms.parametricRimColorFactor.value}set parametricRimColorFactor(i){this.uniforms.parametricRimColorFactor.value=i}get rimMultiplyTexture(){return this.uniforms.rimMultiplyTexture.value}set rimMultiplyTexture(i){this.uniforms.rimMultiplyTexture.value=i}get rimLightingMixFactor(){return this.uniforms.rimLightingMixFactor.value}set rimLightingMixFactor(i){this.uniforms.rimLightingMixFactor.value=i}get parametricRimFresnelPowerFactor(){return this.uniforms.parametricRimFresnelPowerFactor.value}set parametricRimFresnelPowerFactor(i){this.uniforms.parametricRimFresnelPowerFactor.value=i}get parametricRimLiftFactor(){return this.uniforms.parametricRimLiftFactor.value}set parametricRimLiftFactor(i){this.uniforms.parametricRimLiftFactor.value=i}get outlineWidthMultiplyTexture(){return this.uniforms.outlineWidthMultiplyTexture.value}set outlineWidthMultiplyTexture(i){this.uniforms.outlineWidthMultiplyTexture.value=i}get outlineWidthFactor(){return this.uniforms.outlineWidthFactor.value}set outlineWidthFactor(i){this.uniforms.outlineWidthFactor.value=i}get outlineColorFactor(){return this.uniforms.outlineColorFactor.value}set outlineColorFactor(i){this.uniforms.outlineColorFactor.value=i}get outlineLightingMixFactor(){return this.uniforms.outlineLightingMixFactor.value}set outlineLightingMixFactor(i){this.uniforms.outlineLightingMixFactor.value=i}get uvAnimationMaskTexture(){return this.uniforms.uvAnimationMaskTexture.value}set uvAnimationMaskTexture(i){this.uniforms.uvAnimationMaskTexture.value=i}get uvAnimationScrollXOffset(){return this.uniforms.uvAnimationScrollXOffset.value}set uvAnimationScrollXOffset(i){this.uniforms.uvAnimationScrollXOffset.value=i}get uvAnimationScrollYOffset(){return this.uniforms.uvAnimationScrollYOffset.value}set uvAnimationScrollYOffset(i){this.uniforms.uvAnimationScrollYOffset.value=i}get uvAnimationRotationPhase(){return this.uniforms.uvAnimationRotationPhase.value}set uvAnimationRotationPhase(i){this.uniforms.uvAnimationRotationPhase.value=i}get ignoreVertexColor(){return this._ignoreVertexColor}set ignoreVertexColor(i){this._ignoreVertexColor=i,this.needsUpdate=!0}get v0CompatShade(){return this._v0CompatShade}set v0CompatShade(i){this._v0CompatShade=i,this.needsUpdate=!0}get debugMode(){return this._debugMode}set debugMode(i){this._debugMode=i,this.needsUpdate=!0}get outlineWidthMode(){return this._outlineWidthMode}set outlineWidthMode(i){this._outlineWidthMode=i,this.needsUpdate=!0}get isOutline(){return this._isOutline}set isOutline(i){this._isOutline=i,this.needsUpdate=!0}get isMToonMaterial(){return!0}update(i){this._uploadUniformsWorkaround(),this._updateUVAnimation(i)}copy(i){return super.copy(i),this.map=i.map,this.normalMap=i.normalMap,this.emissiveMap=i.emissiveMap,this.shadeMultiplyTexture=i.shadeMultiplyTexture,this.shadingShiftTexture=i.shadingShiftTexture,this.matcapTexture=i.matcapTexture,this.rimMultiplyTexture=i.rimMultiplyTexture,this.outlineWidthMultiplyTexture=i.outlineWidthMultiplyTexture,this.uvAnimationMaskTexture=i.uvAnimationMaskTexture,this.normalMapType=i.normalMapType,this.uvAnimationScrollXSpeedFactor=i.uvAnimationScrollXSpeedFactor,this.uvAnimationScrollYSpeedFactor=i.uvAnimationScrollYSpeedFactor,this.uvAnimationRotationSpeedFactor=i.uvAnimationRotationSpeedFactor,this.ignoreVertexColor=i.ignoreVertexColor,this.v0CompatShade=i.v0CompatShade,this.debugMode=i.debugMode,this.outlineWidthMode=i.outlineWidthMode,this.isOutline=i.isOutline,this.needsUpdate=!0,this}_updateUVAnimation(i){this.uniforms.uvAnimationScrollXOffset.value+=i*this.uvAnimationScrollXSpeedFactor,this.uniforms.uvAnimationScrollYOffset.value+=i*this.uvAnimationScrollYSpeedFactor,this.uniforms.uvAnimationRotationPhase.value+=i*this.uvAnimationRotationSpeedFactor,this.uniforms.alphaTest.value=this.alphaTest,this.uniformsNeedUpdate=!0}_uploadUniformsWorkaround(){this.uniforms.opacity.value=this.opacity,this._updateTextureMatrix(this.uniforms.map,this.uniforms.mapUvTransform),this._updateTextureMatrix(this.uniforms.normalMap,this.uniforms.normalMapUvTransform),this._updateTextureMatrix(this.uniforms.emissiveMap,this.uniforms.emissiveMapUvTransform),this._updateTextureMatrix(this.uniforms.shadeMultiplyTexture,this.uniforms.shadeMultiplyTextureUvTransform),this._updateTextureMatrix(this.uniforms.shadingShiftTexture,this.uniforms.shadingShiftTextureUvTransform),this._updateTextureMatrix(this.uniforms.matcapTexture,this.uniforms.matcapTextureUvTransform),this._updateTextureMatrix(this.uniforms.rimMultiplyTexture,this.uniforms.rimMultiplyTextureUvTransform),this._updateTextureMatrix(this.uniforms.outlineWidthMultiplyTexture,this.uniforms.outlineWidthMultiplyTextureUvTransform),this._updateTextureMatrix(this.uniforms.uvAnimationMaskTexture,this.uniforms.uvAnimationMaskTextureUvTransform),this.uniformsNeedUpdate=!0}_generateDefines(){let i=parseInt("179",10),e=this.outlineWidthMultiplyTexture!==null,t=this.map!==null||this.normalMap!==null||this.emissiveMap!==null||this.shadeMultiplyTexture!==null||this.shadingShiftTexture!==null||this.rimMultiplyTexture!==null||this.uvAnimationMaskTexture!==null;return{THREE_VRM_THREE_REVISION:i,OUTLINE:this._isOutline,MTOON_USE_UV:e||t,MTOON_UVS_VERTEX_ONLY:e&&!t,V0_COMPAT_SHADE:this._v0CompatShade,USE_SHADEMULTIPLYTEXTURE:this.shadeMultiplyTexture!==null,USE_SHADINGSHIFTTEXTURE:this.shadingShiftTexture!==null,USE_MATCAPTEXTURE:this.matcapTexture!==null,USE_RIMMULTIPLYTEXTURE:this.rimMultiplyTexture!==null,USE_OUTLINEWIDTHMULTIPLYTEXTURE:this._isOutline&&this.outlineWidthMultiplyTexture!==null,USE_UVANIMATIONMASKTEXTURE:this.uvAnimationMaskTexture!==null,IGNORE_VERTEX_COLOR:this._ignoreVertexColor===!0,DEBUG_NORMAL:this._debugMode==="normal",DEBUG_LITSHADERATE:this._debugMode==="litShadeRate",DEBUG_UV:this._debugMode==="uv",OUTLINE_WIDTH_SCREEN:this._isOutline&&this._outlineWidthMode===Zf.ScreenCoordinates}}_updateTextureMatrix(i,e){i.value&&(i.value.matrixAutoUpdate&&i.value.updateMatrix(),e.value.copy(i.value.matrix))}},aM=new Set(["1.0","1.0-beta"]),vp=class dl{get name(){return dl.EXTENSION_NAME}constructor(e,t={}){var n,r,s,o;this.parser=e,this.materialType=(n=t.materialType)!=null?n:oM,this.renderOrderOffset=(r=t.renderOrderOffset)!=null?r:0,this.v0CompatShade=(s=t.v0CompatShade)!=null?s:!1,this.debugMode=(o=t.debugMode)!=null?o:"none",this._mToonMaterialSet=new Set}beforeRoot(){return rr(this,null,function*(){this._removeUnlitExtensionIfMToonExists()})}afterRoot(e){return rr(this,null,function*(){e.userData.vrmMToonMaterials=Array.from(this._mToonMaterialSet)})}getMaterialType(e){return this._getMToonExtension(e)?this.materialType:null}extendMaterialParams(e,t){let n=this._getMToonExtension(e);return n?this._extendMaterialParams(n,t):null}loadMesh(e){return rr(this,null,function*(){var t;let n=this.parser,s=(t=n.json.meshes)==null?void 0:t[e];if(s==null)throw new Error(`MToonMaterialLoaderPlugin: Attempt to use meshes[${e}] of glTF but the mesh doesn't exist`);let o=s.primitives,a=yield n.loadMesh(e);if(o.length===1){let l=a,c=o[0].material;c!=null&&this._setupPrimitive(l,c)}else{let l=a;for(let c=0;c<o.length;c++){let u=l.children[c],h=o[c].material;h!=null&&this._setupPrimitive(u,h)}}return a})}_removeUnlitExtensionIfMToonExists(){let n=this.parser.json.materials;n==null||n.map((r,s)=>{var o;this._getMToonExtension(s)&&((o=r.extensions)!=null&&o.KHR_materials_unlit)&&delete r.extensions.KHR_materials_unlit})}_getMToonExtension(e){var t,n;let o=(t=this.parser.json.materials)==null?void 0:t[e];if(o==null){console.warn(`MToonMaterialLoaderPlugin: Attempt to use materials[${e}] of glTF but the material doesn't exist`);return}let a=(n=o.extensions)==null?void 0:n[dl.EXTENSION_NAME];if(a==null)return;let l=a.specVersion;if(!aM.has(l)){console.warn(`MToonMaterialLoaderPlugin: Unknown ${dl.EXTENSION_NAME} specVersion "${l}"`);return}return a}_extendMaterialParams(e,t){return rr(this,null,function*(){var n;delete t.metalness,delete t.roughness;let r=new tM(this.parser,t);r.assignPrimitive("transparentWithZWrite",e.transparentWithZWrite),r.assignColor("shadeColorFactor",e.shadeColorFactor),r.assignTexture("shadeMultiplyTexture",e.shadeMultiplyTexture,!0),r.assignPrimitive("shadingShiftFactor",e.shadingShiftFactor),r.assignTexture("shadingShiftTexture",e.shadingShiftTexture,!0),r.assignPrimitive("shadingShiftTextureScale",(n=e.shadingShiftTexture)==null?void 0:n.scale),r.assignPrimitive("shadingToonyFactor",e.shadingToonyFactor),r.assignPrimitive("giEqualizationFactor",e.giEqualizationFactor),r.assignColor("matcapFactor",e.matcapFactor),r.assignTexture("matcapTexture",e.matcapTexture,!0),r.assignColor("parametricRimColorFactor",e.parametricRimColorFactor),r.assignTexture("rimMultiplyTexture",e.rimMultiplyTexture,!0),r.assignPrimitive("rimLightingMixFactor",e.rimLightingMixFactor),r.assignPrimitive("parametricRimFresnelPowerFactor",e.parametricRimFresnelPowerFactor),r.assignPrimitive("parametricRimLiftFactor",e.parametricRimLiftFactor),r.assignPrimitive("outlineWidthMode",e.outlineWidthMode),r.assignPrimitive("outlineWidthFactor",e.outlineWidthFactor),r.assignTexture("outlineWidthMultiplyTexture",e.outlineWidthMultiplyTexture,!1),r.assignColor("outlineColorFactor",e.outlineColorFactor),r.assignPrimitive("outlineLightingMixFactor",e.outlineLightingMixFactor),r.assignTexture("uvAnimationMaskTexture",e.uvAnimationMaskTexture,!1),r.assignPrimitive("uvAnimationScrollXSpeedFactor",e.uvAnimationScrollXSpeedFactor),r.assignPrimitive("uvAnimationScrollYSpeedFactor",e.uvAnimationScrollYSpeedFactor),r.assignPrimitive("uvAnimationRotationSpeedFactor",e.uvAnimationRotationSpeedFactor),r.assignPrimitive("v0CompatShade",this.v0CompatShade),r.assignPrimitive("debugMode",this.debugMode),yield r.pending})}_setupPrimitive(e,t){let n=this._getMToonExtension(t);if(n){let r=this._parseRenderOrder(n);e.renderOrder=r+this.renderOrderOffset,this._generateOutline(e),this._addToMaterialSet(e);return}}_shouldGenerateOutline(e){return typeof e.outlineWidthMode=="string"&&e.outlineWidthMode!=="none"&&typeof e.outlineWidthFactor=="number"&&e.outlineWidthFactor>0}_generateOutline(e){let t=e.material;if(!(t instanceof Ft)||!this._shouldGenerateOutline(t))return;e.material=[t];let n=t.clone();n.name+=" (Outline)",n.isOutline=!0,n.side=Ut,e.material.push(n);let r=e.geometry,s=r.index?r.index.count:r.attributes.position.count/3;r.addGroup(0,s,0),r.addGroup(0,s,1)}_addToMaterialSet(e){let t=e.material,n=new Set;Array.isArray(t)?t.forEach(r=>n.add(r)):n.add(t);for(let r of n)this._mToonMaterialSet.add(r)}_parseRenderOrder(e){var t;return(e.transparentWithZWrite?0:19)+((t=e.renderQueueOffsetNumber)!=null?t:0)}};vp.EXTENSION_NAME="VRMC_materials_mtoon";var lM=vp,cM=(i,e,t)=>new Promise((n,r)=>{var s=l=>{try{a(t.next(l))}catch(c){r(c)}},o=l=>{try{a(t.throw(l))}catch(c){r(c)}},a=l=>l.done?n(l.value):Promise.resolve(l.value).then(s,o);a((t=t.apply(i,e)).next())}),yp=class Xu{get name(){return Xu.EXTENSION_NAME}constructor(e){this.parser=e}extendMaterialParams(e,t){return cM(this,null,function*(){let n=this._getHDREmissiveMultiplierExtension(e);if(n==null)return;console.warn("VRMMaterialsHDREmissiveMultiplierLoaderPlugin: `VRMC_materials_hdr_emissiveMultiplier` is archived. Use `KHR_materials_emissive_strength` instead.");let r=n.emissiveMultiplier;t.emissiveIntensity=r})}_getHDREmissiveMultiplierExtension(e){var t,n;let o=(t=this.parser.json.materials)==null?void 0:t[e];if(o==null){console.warn(`VRMMaterialsHDREmissiveMultiplierLoaderPlugin: Attempt to use materials[${e}] of glTF but the material doesn't exist`);return}let a=(n=o.extensions)==null?void 0:n[Xu.EXTENSION_NAME];if(a!=null)return a}};yp.EXTENSION_NAME="VRMC_materials_hdr_emissiveMultiplier";var uM=yp,hM=Object.defineProperty,dM=Object.defineProperties,fM=Object.getOwnPropertyDescriptors,$f=Object.getOwnPropertySymbols,pM=Object.prototype.hasOwnProperty,mM=Object.prototype.propertyIsEnumerable,jf=(i,e,t)=>e in i?hM(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t,Fn=(i,e)=>{for(var t in e||(e={}))pM.call(e,t)&&jf(i,t,e[t]);if($f)for(var t of $f(e))mM.call(e,t)&&jf(i,t,e[t]);return i},Kf=(i,e)=>dM(i,fM(e)),gM=(i,e,t)=>new Promise((n,r)=>{var s=l=>{try{a(t.next(l))}catch(c){r(c)}},o=l=>{try{a(t.throw(l))}catch(c){r(c)}},a=l=>l.done?n(l.value):Promise.resolve(l.value).then(s,o);a((t=t.apply(i,e)).next())});function Jr(i){return Math.pow(i,2.2)}var _M=class{get name(){return"VRMMaterialsV0CompatPlugin"}constructor(i){var e;this.parser=i,this._renderQueueMapTransparent=new Map,this._renderQueueMapTransparentZWrite=new Map;let t=this.parser.json;t.extensionsUsed=(e=t.extensionsUsed)!=null?e:[],t.extensionsUsed.indexOf("KHR_texture_transform")===-1&&t.extensionsUsed.push("KHR_texture_transform")}beforeRoot(){return gM(this,null,function*(){var i;let e=this.parser.json,t=(i=e.extensions)==null?void 0:i.VRM,n=t==null?void 0:t.materialProperties;n&&(this._populateRenderQueueMap(n),n.forEach((r,s)=>{var o,a;let l=(o=e.materials)==null?void 0:o[s];if(l==null){console.warn(`VRMMaterialsV0CompatPlugin: Attempt to use materials[${s}] of glTF but the material doesn't exist`);return}if(r.shader==="VRM/MToon"){let c=this._parseV0MToonProperties(r,l);e.materials[s]=c}else if((a=r.shader)!=null&&a.startsWith("VRM/Unlit")){let c=this._parseV0UnlitProperties(r,l);e.materials[s]=c}else r.shader==="VRM_USE_GLTFSHADER"||console.warn(`VRMMaterialsV0CompatPlugin: Unknown shader: ${r.shader}`)}))})}_parseV0MToonProperties(i,e){var t,n,r,s,o,a,l,c,u,h,d,f,p,_,g,m,y,S,v,A,R,I,L,M,T,C,H,z,G,$,W,J,V,le,se,we,ze,ht,rt,q,ce,re,Ie,Le,Be,_t,Ze,N,ot,Re,Ke,be,dt,pe,Ge;let St=(n=(t=i.keywordMap)==null?void 0:t._ALPHABLEND_ON)!=null?n:!1,P=((r=i.floatProperties)==null?void 0:r._ZWrite)===1&&St,E=this._v0ParseRenderQueue(i),F=(o=(s=i.keywordMap)==null?void 0:s._ALPHATEST_ON)!=null?o:!1,Y=St?"BLEND":F?"MASK":"OPAQUE",j=F?(l=(a=i.floatProperties)==null?void 0:a._Cutoff)!=null?l:.5:void 0,Te=((u=(c=i.floatProperties)==null?void 0:c._CullMode)!=null?u:2)===0,ee=this._portTextureTransform(i),Me=((d=(h=i.vectorProperties)==null?void 0:h._Color)!=null?d:[1,1,1,1]).map((B,k)=>k===3?B:Jr(B)),Ee=(f=i.textureProperties)==null?void 0:f._MainTex,te=Ee!=null?{index:Ee,extensions:Fn({},ee)}:void 0,he=(_=(p=i.floatProperties)==null?void 0:p._BumpScale)!=null?_:1,Ne=(g=i.textureProperties)==null?void 0:g._BumpMap,Se=Ne!=null?{index:Ne,scale:he,extensions:Fn({},ee)}:void 0,ue=((y=(m=i.vectorProperties)==null?void 0:m._EmissionColor)!=null?y:[0,0,0,1]).map(Jr),Ve=(S=i.textureProperties)==null?void 0:S._EmissionMap,U=Ve!=null?{index:Ve,extensions:Fn({},ee)}:void 0,ne=((A=(v=i.vectorProperties)==null?void 0:v._ShadeColor)!=null?A:[.97,.81,.86,1]).map(Jr),oe=(R=i.textureProperties)==null?void 0:R._ShadeTexture,me=oe!=null?{index:oe,extensions:Fn({},ee)}:void 0,K=(L=(I=i.floatProperties)==null?void 0:I._ShadeShift)!=null?L:0,Z=(T=(M=i.floatProperties)==null?void 0:M._ShadeToony)!=null?T:.9;Z=De.lerp(Z,1,.5+.5*K),K=-K-(1-Z);let xe=(H=(C=i.floatProperties)==null?void 0:C._IndirectLightIntensity)!=null?H:.1,He=xe?1-xe:void 0,st=(z=i.textureProperties)==null?void 0:z._SphereAdd,et=st!=null?[1,1,1]:void 0,xn=st!=null?{index:st}:void 0,sn=($=(G=i.floatProperties)==null?void 0:G._RimLightingMix)!=null?$:0,ss=(W=i.textureProperties)==null?void 0:W._RimTexture,Vn=ss!=null?{index:ss,extensions:Fn({},ee)}:void 0,os=((V=(J=i.vectorProperties)==null?void 0:J._RimColor)!=null?V:[0,0,0,1]).map(Jr),lo=(se=(le=i.floatProperties)==null?void 0:le._RimFresnelPower)!=null?se:1,co=(ze=(we=i.floatProperties)==null?void 0:we._RimLift)!=null?ze:0,ar=["none","worldCoordinates","screenCoordinates"][(rt=(ht=i.floatProperties)==null?void 0:ht._OutlineWidthMode)!=null?rt:0],lr=(ce=(q=i.floatProperties)==null?void 0:q._OutlineWidth)!=null?ce:0;lr=.01*lr;let Ri=(re=i.textureProperties)==null?void 0:re._OutlineWidthTexture,uo=Ri!=null?{index:Ri,extensions:Fn({},ee)}:void 0,ho=((Le=(Ie=i.vectorProperties)==null?void 0:Ie._OutlineColor)!=null?Le:[0,0,0]).map(Jr),Rl=((_t=(Be=i.floatProperties)==null?void 0:Be._OutlineColorMode)!=null?_t:0)===1?(N=(Ze=i.floatProperties)==null?void 0:Ze._OutlineLightingMix)!=null?N:1:0,fo=(ot=i.textureProperties)==null?void 0:ot._UvAnimMaskTexture,Cl=fo!=null?{index:fo,extensions:Fn({},ee)}:void 0,Pl=(Ke=(Re=i.floatProperties)==null?void 0:Re._UvAnimScrollX)!=null?Ke:0,cr=(dt=(be=i.floatProperties)==null?void 0:be._UvAnimScrollY)!=null?dt:0;cr!=null&&(cr=-cr);let b=(Ge=(pe=i.floatProperties)==null?void 0:pe._UvAnimRotation)!=null?Ge:0,D={specVersion:"1.0",transparentWithZWrite:P,renderQueueOffsetNumber:E,shadeColorFactor:ne,shadeMultiplyTexture:me,shadingShiftFactor:K,shadingToonyFactor:Z,giEqualizationFactor:He,matcapFactor:et,matcapTexture:xn,rimLightingMixFactor:sn,rimMultiplyTexture:Vn,parametricRimColorFactor:os,parametricRimFresnelPowerFactor:lo,parametricRimLiftFactor:co,outlineWidthMode:ar,outlineWidthFactor:lr,outlineWidthMultiplyTexture:uo,outlineColorFactor:ho,outlineLightingMixFactor:Rl,uvAnimationMaskTexture:Cl,uvAnimationScrollXSpeedFactor:Pl,uvAnimationScrollYSpeedFactor:cr,uvAnimationRotationSpeedFactor:b};return Kf(Fn({},e),{pbrMetallicRoughness:{baseColorFactor:Me,baseColorTexture:te},normalTexture:Se,emissiveTexture:U,emissiveFactor:ue,alphaMode:Y,alphaCutoff:j,doubleSided:Te,extensions:{VRMC_materials_mtoon:D}})}_parseV0UnlitProperties(i,e){var t,n,r,s,o;let a=i.shader==="VRM/UnlitTransparentZWrite",l=i.shader==="VRM/UnlitTransparent"||a,c=this._v0ParseRenderQueue(i),u=i.shader==="VRM/UnlitCutout",h=l?"BLEND":u?"MASK":"OPAQUE",d=u?(n=(t=i.floatProperties)==null?void 0:t._Cutoff)!=null?n:.5:void 0,f=this._portTextureTransform(i),p=((s=(r=i.vectorProperties)==null?void 0:r._Color)!=null?s:[1,1,1,1]).map(Jr),_=(o=i.textureProperties)==null?void 0:o._MainTex,g=_!=null?{index:_,extensions:Fn({},f)}:void 0,m={specVersion:"1.0",transparentWithZWrite:a,renderQueueOffsetNumber:c,shadeColorFactor:p,shadeMultiplyTexture:g};return Kf(Fn({},e),{pbrMetallicRoughness:{baseColorFactor:p,baseColorTexture:g},alphaMode:h,alphaCutoff:d,extensions:{VRMC_materials_mtoon:m}})}_portTextureTransform(i){var e,t,n,r,s;let o=(e=i.vectorProperties)==null?void 0:e._MainTex;if(o==null)return{};let a=[(t=o==null?void 0:o[0])!=null?t:0,(n=o==null?void 0:o[1])!=null?n:0],l=[(r=o==null?void 0:o[2])!=null?r:1,(s=o==null?void 0:o[3])!=null?s:1];return a[1]=1-l[1]-a[1],{KHR_texture_transform:{offset:a,scale:l}}}_v0ParseRenderQueue(i){var e,t;let n=i.shader==="VRM/UnlitTransparentZWrite",r=((e=i.keywordMap)==null?void 0:e._ALPHABLEND_ON)!=null||i.shader==="VRM/UnlitTransparent"||n,s=((t=i.floatProperties)==null?void 0:t._ZWrite)===1||n,o=0;if(r){let a=i.renderQueue;a!=null&&(s?o=this._renderQueueMapTransparentZWrite.get(a):o=this._renderQueueMapTransparent.get(a))}return o}_populateRenderQueueMap(i){let e=new Set,t=new Set;i.forEach(n=>{var r,s;let o=n.shader==="VRM/UnlitTransparentZWrite",a=((r=n.keywordMap)==null?void 0:r._ALPHABLEND_ON)!=null||n.shader==="VRM/UnlitTransparent"||o,l=((s=n.floatProperties)==null?void 0:s._ZWrite)===1||o;if(a){let c=n.renderQueue;c!=null&&(l?t.add(c):e.add(c))}}),e.size>10&&console.warn(`VRMMaterialsV0CompatPlugin: This VRM uses ${e.size} render queues for Transparent materials while VRM 1.0 only supports up to 10 render queues. The model might not be rendered correctly.`),t.size>10&&console.warn(`VRMMaterialsV0CompatPlugin: This VRM uses ${t.size} render queues for TransparentZWrite materials while VRM 1.0 only supports up to 10 render queues. The model might not be rendered correctly.`),Array.from(e).sort().forEach((n,r)=>{let s=Math.min(Math.max(r-e.size+1,-9),0);this._renderQueueMapTransparent.set(n,s)}),Array.from(t).sort().forEach((n,r)=>{let s=Math.min(Math.max(r,0),9);this._renderQueueMapTransparentZWrite.set(n,s)})}},Jf=(i,e,t)=>new Promise((n,r)=>{var s=l=>{try{a(t.next(l))}catch(c){r(c)}},o=l=>{try{a(t.throw(l))}catch(c){r(c)}},a=l=>l.done?n(l.value):Promise.resolve(l.value).then(s,o);a((t=t.apply(i,e)).next())}),bi=new w,Uu=class extends mt{constructor(i){super(),this._attrPosition=new ke(new Float32Array([0,0,0,0,0,0]),3),this._attrPosition.setUsage(Pc);let e=new nt;e.setAttribute("position",this._attrPosition);let t=new Wt({color:16711935,depthTest:!1,depthWrite:!1});this._line=new Jn(e,t),this.add(this._line),this.constraint=i}updateMatrixWorld(i){bi.setFromMatrixPosition(this.constraint.destination.matrixWorld),this._attrPosition.setXYZ(0,bi.x,bi.y,bi.z),this.constraint.source&&bi.setFromMatrixPosition(this.constraint.source.matrixWorld),this._attrPosition.setXYZ(1,bi.x,bi.y,bi.z),this._attrPosition.needsUpdate=!0,super.updateMatrixWorld(i)}};function Qf(i,e){return e.set(i.elements[12],i.elements[13],i.elements[14])}var xM=new w,vM=new w;function yM(i,e){return i.decompose(xM,e,vM),e}function pl(i){return i.invert?i.invert():i.inverse(),i}var Zu=class{constructor(i,e){this.destination=i,this.source=e,this.weight=1}},MM=new w,EM=new w,SM=new w,TM=new Q,bM=new Q,wM=new Q,AM=class extends Zu{get aimAxis(){return this._aimAxis}set aimAxis(i){this._aimAxis=i,this._v3AimAxis.set(i==="PositiveX"?1:i==="NegativeX"?-1:0,i==="PositiveY"?1:i==="NegativeY"?-1:0,i==="PositiveZ"?1:i==="NegativeZ"?-1:0)}get dependencies(){let i=new Set([this.source]);return this.destination.parent&&i.add(this.destination.parent),i}constructor(i,e){super(i,e),this._aimAxis="PositiveX",this._v3AimAxis=new w(1,0,0),this._dstRestQuat=new Q}setInitState(){this._dstRestQuat.copy(this.destination.quaternion)}update(){this.destination.updateWorldMatrix(!0,!1),this.source.updateWorldMatrix(!0,!1);let i=TM.identity(),e=bM.identity();this.destination.parent&&(yM(this.destination.parent.matrixWorld,i),pl(e.copy(i)));let t=MM.copy(this._v3AimAxis).applyQuaternion(this._dstRestQuat).applyQuaternion(i),n=Qf(this.source.matrixWorld,EM).sub(Qf(this.destination.matrixWorld,SM)).normalize(),r=wM.setFromUnitVectors(t,n).premultiply(e).multiply(i).multiply(this._dstRestQuat);this.destination.quaternion.copy(this._dstRestQuat).slerp(r,this.weight)}};function RM(i,e){let t=[i],n=i.parent;for(;n!==null;)t.unshift(n),n=n.parent;t.forEach(r=>{e(r)})}var CM=class{constructor(){this._constraints=new Set,this._objectConstraintsMap=new Map}get constraints(){return this._constraints}addConstraint(i){this._constraints.add(i);let e=this._objectConstraintsMap.get(i.destination);e==null&&(e=new Set,this._objectConstraintsMap.set(i.destination,e)),e.add(i)}deleteConstraint(i){this._constraints.delete(i),this._objectConstraintsMap.get(i.destination).delete(i)}setInitState(){let i=new Set,e=new Set;for(let t of this._constraints)this._processConstraint(t,i,e,n=>n.setInitState())}update(){let i=new Set,e=new Set;for(let t of this._constraints)this._processConstraint(t,i,e,n=>n.update())}_processConstraint(i,e,t,n){if(t.has(i))return;if(e.has(i))throw new Error("VRMNodeConstraintManager: Circular dependency detected while updating constraints");e.add(i);let r=i.dependencies;for(let s of r)RM(s,o=>{let a=this._objectConstraintsMap.get(o);if(a)for(let l of a)this._processConstraint(l,e,t,n)});n(i),t.add(i)}},PM=new Q,IM=new Q,LM=class extends Zu{get dependencies(){return new Set([this.source])}constructor(i,e){super(i,e),this._dstRestQuat=new Q,this._invSrcRestQuat=new Q}setInitState(){this._dstRestQuat.copy(this.destination.quaternion),pl(this._invSrcRestQuat.copy(this.source.quaternion))}update(){let i=PM.copy(this._invSrcRestQuat).multiply(this.source.quaternion),e=IM.copy(this._dstRestQuat).multiply(i);this.destination.quaternion.copy(this._dstRestQuat).slerp(e,this.weight)}},NM=new w,UM=new Q,DM=new Q,OM=class extends Zu{get rollAxis(){return this._rollAxis}set rollAxis(i){this._rollAxis=i,this._v3RollAxis.set(i==="X"?1:0,i==="Y"?1:0,i==="Z"?1:0)}get dependencies(){return new Set([this.source])}constructor(i,e){super(i,e),this._rollAxis="X",this._v3RollAxis=new w(1,0,0),this._dstRestQuat=new Q,this._invDstRestQuat=new Q,this._invSrcRestQuatMulDstRestQuat=new Q}setInitState(){this._dstRestQuat.copy(this.destination.quaternion),pl(this._invDstRestQuat.copy(this._dstRestQuat)),pl(this._invSrcRestQuatMulDstRestQuat.copy(this.source.quaternion)).multiply(this._dstRestQuat)}update(){let i=UM.copy(this._invDstRestQuat).multiply(this.source.quaternion).multiply(this._invSrcRestQuatMulDstRestQuat),e=NM.copy(this._v3RollAxis).applyQuaternion(i),n=DM.setFromUnitVectors(e,this._v3RollAxis).premultiply(this._dstRestQuat).multiply(i);this.destination.quaternion.copy(this._dstRestQuat).slerp(n,this.weight)}},FM=new Set(["1.0","1.0-beta"]),Mp=class ro{get name(){return ro.EXTENSION_NAME}constructor(e,t){this.parser=e,this.helperRoot=t==null?void 0:t.helperRoot}afterRoot(e){return Jf(this,null,function*(){e.userData.vrmNodeConstraintManager=yield this._import(e)})}_import(e){return Jf(this,null,function*(){var t;let n=this.parser.json;if(!(((t=n.extensionsUsed)==null?void 0:t.indexOf(ro.EXTENSION_NAME))!==-1))return null;let s=new CM,o=yield this.parser.getDependencies("node");return o.forEach((a,l)=>{var c;let u=n.nodes[l],h=(c=u==null?void 0:u.extensions)==null?void 0:c[ro.EXTENSION_NAME];if(h==null)return;let d=h.specVersion;if(!FM.has(d)){console.warn(`VRMNodeConstraintLoaderPlugin: Unknown ${ro.EXTENSION_NAME} specVersion "${d}"`);return}let f=h.constraint;if(f.roll!=null){let p=this._importRollConstraint(a,o,f.roll);s.addConstraint(p)}else if(f.aim!=null){let p=this._importAimConstraint(a,o,f.aim);s.addConstraint(p)}else if(f.rotation!=null){let p=this._importRotationConstraint(a,o,f.rotation);s.addConstraint(p)}}),e.scene.updateMatrixWorld(),s.setInitState(),s})}_importRollConstraint(e,t,n){let{source:r,rollAxis:s,weight:o}=n,a=t[r],l=new OM(e,a);if(s!=null&&(l.rollAxis=s),o!=null&&(l.weight=o),this.helperRoot){let c=new Uu(l);this.helperRoot.add(c)}return l}_importAimConstraint(e,t,n){let{source:r,aimAxis:s,weight:o}=n,a=t[r],l=new AM(e,a);if(s!=null&&(l.aimAxis=s),o!=null&&(l.weight=o),this.helperRoot){let c=new Uu(l);this.helperRoot.add(c)}return l}_importRotationConstraint(e,t,n){let{source:r,weight:s}=n,o=t[r],a=new LM(e,o);if(s!=null&&(a.weight=s),this.helperRoot){let l=new Uu(a);this.helperRoot.add(l)}return a}};Mp.EXTENSION_NAME="VRMC_node_constraint";var BM=Mp,cl=(i,e,t)=>new Promise((n,r)=>{var s=l=>{try{a(t.next(l))}catch(c){r(c)}},o=l=>{try{a(t.throw(l))}catch(c){r(c)}},a=l=>l.done?n(l.value):Promise.resolve(l.value).then(s,o);a((t=t.apply(i,e)).next())}),$u=class{},Du=new w,ir=new w,Ep=class extends $u{get type(){return"capsule"}constructor(i){var e,t,n,r;super(),this.offset=(e=i==null?void 0:i.offset)!=null?e:new w(0,0,0),this.tail=(t=i==null?void 0:i.tail)!=null?t:new w(0,0,0),this.radius=(n=i==null?void 0:i.radius)!=null?n:0,this.inside=(r=i==null?void 0:i.inside)!=null?r:!1}calculateCollision(i,e,t,n){Du.setFromMatrixPosition(i),ir.subVectors(this.tail,this.offset).applyMatrix4(i),ir.sub(Du);let r=ir.lengthSq();n.copy(e).sub(Du);let s=ir.dot(n);s<=0||(r<=s||ir.multiplyScalar(s/r),n.sub(ir));let o=n.length(),a=this.inside?this.radius-t-o:o-t-this.radius;return a<0&&(n.multiplyScalar(1/o),this.inside&&n.negate()),a}},Ou=new w,ep=new Ce,Sp=class extends $u{get type(){return"plane"}constructor(i){var e,t;super(),this.offset=(e=i==null?void 0:i.offset)!=null?e:new w(0,0,0),this.normal=(t=i==null?void 0:i.normal)!=null?t:new w(0,0,1)}calculateCollision(i,e,t,n){n.setFromMatrixPosition(i),n.negate().add(e),ep.getNormalMatrix(i),Ou.copy(this.normal).applyNormalMatrix(ep).normalize();let r=n.dot(Ou)-t;return n.copy(Ou),r}},kM=new w,Tp=class extends $u{get type(){return"sphere"}constructor(i){var e,t,n;super(),this.offset=(e=i==null?void 0:i.offset)!=null?e:new w(0,0,0),this.radius=(t=i==null?void 0:i.radius)!=null?t:0,this.inside=(n=i==null?void 0:i.inside)!=null?n:!1}calculateCollision(i,e,t,n){n.subVectors(e,kM.setFromMatrixPosition(i));let r=n.length(),s=this.inside?this.radius-t-r:r-t-this.radius;return s<0&&(n.multiplyScalar(1/r),this.inside&&n.negate()),s}},Bn=new w,HM=class extends nt{constructor(i){super(),this.worldScale=1,this._currentRadius=0,this._currentOffset=new w,this._currentTail=new w,this._shape=i,this._attrPos=new ke(new Float32Array(396),3),this.setAttribute("position",this._attrPos),this._attrIndex=new ke(new Uint16Array(264),1),this.setIndex(this._attrIndex),this._buildIndex(),this.update()}update(){let i=!1,e=this._shape.radius/this.worldScale;this._currentRadius!==e&&(this._currentRadius=e,i=!0),this._currentOffset.equals(this._shape.offset)||(this._currentOffset.copy(this._shape.offset),i=!0);let t=Bn.copy(this._shape.tail).divideScalar(this.worldScale);this._currentTail.distanceToSquared(t)>1e-10&&(this._currentTail.copy(t),i=!0),i&&this._buildPosition()}_buildPosition(){Bn.copy(this._currentTail).sub(this._currentOffset);let i=Bn.length()/this._currentRadius;for(let n=0;n<=16;n++){let r=n/16*Math.PI;this._attrPos.setXYZ(n,-Math.sin(r),-Math.cos(r),0),this._attrPos.setXYZ(17+n,i+Math.sin(r),Math.cos(r),0),this._attrPos.setXYZ(34+n,-Math.sin(r),0,-Math.cos(r)),this._attrPos.setXYZ(51+n,i+Math.sin(r),0,Math.cos(r))}for(let n=0;n<32;n++){let r=n/16*Math.PI;this._attrPos.setXYZ(68+n,0,Math.sin(r),Math.cos(r)),this._attrPos.setXYZ(100+n,i,Math.sin(r),Math.cos(r))}let e=Math.atan2(Bn.y,Math.sqrt(Bn.x*Bn.x+Bn.z*Bn.z)),t=-Math.atan2(Bn.z,Bn.x);this.rotateZ(e),this.rotateY(t),this.scale(this._currentRadius,this._currentRadius,this._currentRadius),this.translate(this._currentOffset.x,this._currentOffset.y,this._currentOffset.z),this._attrPos.needsUpdate=!0}_buildIndex(){for(let i=0;i<34;i++){let e=(i+1)%34;this._attrIndex.setXY(i*2,i,e),this._attrIndex.setXY(68+i*2,34+i,34+e)}for(let i=0;i<32;i++){let e=(i+1)%32;this._attrIndex.setXY(136+i*2,68+i,68+e),this._attrIndex.setXY(200+i*2,100+i,100+e)}this._attrIndex.needsUpdate=!0}},VM=class extends nt{constructor(i){super(),this.worldScale=1,this._currentOffset=new w,this._currentNormal=new w,this._shape=i,this._attrPos=new ke(new Float32Array(18),3),this.setAttribute("position",this._attrPos),this._attrIndex=new ke(new Uint16Array(10),1),this.setIndex(this._attrIndex),this._buildIndex(),this.update()}update(){let i=!1;this._currentOffset.equals(this._shape.offset)||(this._currentOffset.copy(this._shape.offset),i=!0),this._currentNormal.equals(this._shape.normal)||(this._currentNormal.copy(this._shape.normal),i=!0),i&&this._buildPosition()}_buildPosition(){this._attrPos.setXYZ(0,-.5,-.5,0),this._attrPos.setXYZ(1,.5,-.5,0),this._attrPos.setXYZ(2,.5,.5,0),this._attrPos.setXYZ(3,-.5,.5,0),this._attrPos.setXYZ(4,0,0,0),this._attrPos.setXYZ(5,0,0,.25),this.translate(this._currentOffset.x,this._currentOffset.y,this._currentOffset.z),this.lookAt(this._currentNormal),this._attrPos.needsUpdate=!0}_buildIndex(){this._attrIndex.setXY(0,0,1),this._attrIndex.setXY(2,1,2),this._attrIndex.setXY(4,2,3),this._attrIndex.setXY(6,3,0),this._attrIndex.setXY(8,4,5),this._attrIndex.needsUpdate=!0}},zM=class extends nt{constructor(i){super(),this.worldScale=1,this._currentRadius=0,this._currentOffset=new w,this._shape=i,this._attrPos=new ke(new Float32Array(288),3),this.setAttribute("position",this._attrPos),this._attrIndex=new ke(new Uint16Array(192),1),this.setIndex(this._attrIndex),this._buildIndex(),this.update()}update(){let i=!1,e=this._shape.radius/this.worldScale;this._currentRadius!==e&&(this._currentRadius=e,i=!0),this._currentOffset.equals(this._shape.offset)||(this._currentOffset.copy(this._shape.offset),i=!0),i&&this._buildPosition()}_buildPosition(){for(let i=0;i<32;i++){let e=i/16*Math.PI;this._attrPos.setXYZ(i,Math.cos(e),Math.sin(e),0),this._attrPos.setXYZ(32+i,0,Math.cos(e),Math.sin(e)),this._attrPos.setXYZ(64+i,Math.sin(e),0,Math.cos(e))}this.scale(this._currentRadius,this._currentRadius,this._currentRadius),this.translate(this._currentOffset.x,this._currentOffset.y,this._currentOffset.z),this._attrPos.needsUpdate=!0}_buildIndex(){for(let i=0;i<32;i++){let e=(i+1)%32;this._attrIndex.setXY(i*2,i,e),this._attrIndex.setXY(64+i*2,32+i,32+e),this._attrIndex.setXY(128+i*2,64+i,64+e)}this._attrIndex.needsUpdate=!0}},GM=new w,Fu=class extends mt{constructor(i){if(super(),this.matrixAutoUpdate=!1,this.collider=i,this.collider.shape instanceof Tp)this._geometry=new zM(this.collider.shape);else if(this.collider.shape instanceof Ep)this._geometry=new HM(this.collider.shape);else if(this.collider.shape instanceof Sp)this._geometry=new VM(this.collider.shape);else throw new Error("VRMSpringBoneColliderHelper: Unknown collider shape type detected");let e=new Wt({color:16711935,depthTest:!1,depthWrite:!1});this._line=new un(this._geometry,e),this.add(this._line)}dispose(){this._geometry.dispose()}updateMatrixWorld(i){this.collider.updateWorldMatrix(!0,!1),this.matrix.copy(this.collider.matrixWorld);let e=this.matrix.elements;this._geometry.worldScale=GM.set(e[0],e[1],e[2]).length(),this._geometry.update(),super.updateMatrixWorld(i)}},WM=class extends nt{constructor(i){super(),this.worldScale=1,this._currentRadius=0,this._currentTail=new w,this._springBone=i,this._attrPos=new ke(new Float32Array(294),3),this.setAttribute("position",this._attrPos),this._attrIndex=new ke(new Uint16Array(194),1),this.setIndex(this._attrIndex),this._buildIndex(),this.update()}update(){let i=!1,e=this._springBone.settings.hitRadius/this.worldScale;this._currentRadius!==e&&(this._currentRadius=e,i=!0),this._currentTail.equals(this._springBone.initialLocalChildPosition)||(this._currentTail.copy(this._springBone.initialLocalChildPosition),i=!0),i&&this._buildPosition()}_buildPosition(){for(let i=0;i<32;i++){let e=i/16*Math.PI;this._attrPos.setXYZ(i,Math.cos(e),Math.sin(e),0),this._attrPos.setXYZ(32+i,0,Math.cos(e),Math.sin(e)),this._attrPos.setXYZ(64+i,Math.sin(e),0,Math.cos(e))}this.scale(this._currentRadius,this._currentRadius,this._currentRadius),this.translate(this._currentTail.x,this._currentTail.y,this._currentTail.z),this._attrPos.setXYZ(96,0,0,0),this._attrPos.setXYZ(97,this._currentTail.x,this._currentTail.y,this._currentTail.z),this._attrPos.needsUpdate=!0}_buildIndex(){for(let i=0;i<32;i++){let e=(i+1)%32;this._attrIndex.setXY(i*2,i,e),this._attrIndex.setXY(64+i*2,32+i,32+e),this._attrIndex.setXY(128+i*2,64+i,64+e)}this._attrIndex.setXY(192,96,97),this._attrIndex.needsUpdate=!0}},XM=new w,qM=class extends mt{constructor(i){super(),this.matrixAutoUpdate=!1,this.springBone=i,this._geometry=new WM(this.springBone);let e=new Wt({color:16776960,depthTest:!1,depthWrite:!1});this._line=new un(this._geometry,e),this.add(this._line)}dispose(){this._geometry.dispose()}updateMatrixWorld(i){this.springBone.bone.updateWorldMatrix(!0,!1),this.matrix.copy(this.springBone.bone.matrixWorld);let e=this.matrix.elements;this._geometry.worldScale=XM.set(e[0],e[1],e[2]).length(),this._geometry.update(),super.updateMatrixWorld(i)}},Bu=class extends Qe{constructor(i){super(),this.colliderMatrix=new ve,this.shape=i}updateWorldMatrix(i,e){super.updateWorldMatrix(i,e),YM(this.colliderMatrix,this.matrixWorld,this.shape.offset)}};function YM(i,e,t){let n=e.elements;i.copy(e),t&&(i.elements[12]=n[0]*t.x+n[4]*t.y+n[8]*t.z+n[12],i.elements[13]=n[1]*t.x+n[5]*t.y+n[9]*t.z+n[13],i.elements[14]=n[2]*t.x+n[6]*t.y+n[10]*t.z+n[14])}var ZM=new ve;function $M(i){return i.invert?i.invert():i.getInverse(ZM.copy(i)),i}var jM=class{constructor(i){this._inverseCache=new ve,this._shouldUpdateInverse=!0,this.matrix=i;let e={set:(t,n,r)=>(this._shouldUpdateInverse=!0,t[n]=r,!0)};this._originalElements=i.elements,i.elements=new Proxy(i.elements,e)}get inverse(){return this._shouldUpdateInverse&&($M(this._inverseCache.copy(this.matrix)),this._shouldUpdateInverse=!1),this._inverseCache}revert(){this.matrix.elements=this._originalElements}},ku=new ve,Qr=new w,to=new w,no=new w,io=new w,KM=new ve,JM=class{constructor(i,e,t={},n=[]){this._currentTail=new w,this._prevTail=new w,this._boneAxis=new w,this._worldSpaceBoneLength=0,this._center=null,this._initialLocalMatrix=new ve,this._initialLocalRotation=new Q,this._initialLocalChildPosition=new w;var r,s,o,a,l,c;this.bone=i,this.bone.matrixAutoUpdate=!1,this.child=e,this.settings={hitRadius:(r=t.hitRadius)!=null?r:0,stiffness:(s=t.stiffness)!=null?s:1,gravityPower:(o=t.gravityPower)!=null?o:0,gravityDir:(l=(a=t.gravityDir)==null?void 0:a.clone())!=null?l:new w(0,-1,0),dragForce:(c=t.dragForce)!=null?c:.4},this.colliderGroups=n}get dependencies(){let i=new Set,e=this.bone.parent;e&&i.add(e);for(let t=0;t<this.colliderGroups.length;t++)for(let n=0;n<this.colliderGroups[t].colliders.length;n++)i.add(this.colliderGroups[t].colliders[n]);return i}get center(){return this._center}set center(i){var e;(e=this._center)!=null&&e.userData.inverseCacheProxy&&(this._center.userData.inverseCacheProxy.revert(),delete this._center.userData.inverseCacheProxy),this._center=i,this._center&&(this._center.userData.inverseCacheProxy||(this._center.userData.inverseCacheProxy=new jM(this._center.matrixWorld)))}get initialLocalChildPosition(){return this._initialLocalChildPosition}get _parentMatrixWorld(){return this.bone.parent?this.bone.parent.matrixWorld:ku}setInitState(){this._initialLocalMatrix.copy(this.bone.matrix),this._initialLocalRotation.copy(this.bone.quaternion),this.child?this._initialLocalChildPosition.copy(this.child.position):this._initialLocalChildPosition.copy(this.bone.position).normalize().multiplyScalar(.07);let i=this._getMatrixWorldToCenter();this.bone.localToWorld(this._currentTail.copy(this._initialLocalChildPosition)).applyMatrix4(i),this._prevTail.copy(this._currentTail),this._boneAxis.copy(this._initialLocalChildPosition).normalize()}reset(){this.bone.quaternion.copy(this._initialLocalRotation),this.bone.updateMatrix(),this.bone.matrixWorld.multiplyMatrices(this._parentMatrixWorld,this.bone.matrix);let i=this._getMatrixWorldToCenter();this.bone.localToWorld(this._currentTail.copy(this._initialLocalChildPosition)).applyMatrix4(i),this._prevTail.copy(this._currentTail)}update(i){if(i<=0)return;this._calcWorldSpaceBoneLength();let e=to.copy(this._boneAxis).transformDirection(this._initialLocalMatrix).transformDirection(this._parentMatrixWorld);io.copy(this._currentTail).add(Qr.subVectors(this._currentTail,this._prevTail).multiplyScalar(1-this.settings.dragForce)).applyMatrix4(this._getMatrixCenterToWorld()).addScaledVector(e,this.settings.stiffness*i).addScaledVector(this.settings.gravityDir,this.settings.gravityPower*i),no.setFromMatrixPosition(this.bone.matrixWorld),io.sub(no).normalize().multiplyScalar(this._worldSpaceBoneLength).add(no),this._collision(io),this._prevTail.copy(this._currentTail),this._currentTail.copy(io).applyMatrix4(this._getMatrixWorldToCenter());let t=KM.multiplyMatrices(this._parentMatrixWorld,this._initialLocalMatrix).invert();this.bone.quaternion.setFromUnitVectors(this._boneAxis,Qr.copy(io).applyMatrix4(t).normalize()).premultiply(this._initialLocalRotation),this.bone.updateMatrix(),this.bone.matrixWorld.multiplyMatrices(this._parentMatrixWorld,this.bone.matrix)}_collision(i){for(let e=0;e<this.colliderGroups.length;e++)for(let t=0;t<this.colliderGroups[e].colliders.length;t++){let n=this.colliderGroups[e].colliders[t],r=n.shape.calculateCollision(n.colliderMatrix,i,this.settings.hitRadius,Qr);if(r<0){i.addScaledVector(Qr,-r),i.sub(no);let s=i.length();i.multiplyScalar(this._worldSpaceBoneLength/s).add(no)}}}_calcWorldSpaceBoneLength(){Qr.setFromMatrixPosition(this.bone.matrixWorld),this.child?to.setFromMatrixPosition(this.child.matrixWorld):(to.copy(this._initialLocalChildPosition),to.applyMatrix4(this.bone.matrixWorld)),this._worldSpaceBoneLength=Qr.sub(to).length()}_getMatrixCenterToWorld(){return this._center?this._center.matrixWorld:ku}_getMatrixWorldToCenter(){return this._center?this._center.userData.inverseCacheProxy.inverse:ku}};function QM(i,e){let t=[],n=i;for(;n!==null;)t.unshift(n),n=n.parent;t.forEach(r=>{e(r)})}function qu(i,e){i.children.forEach(t=>{e(t)||qu(t,e)})}function eE(i){var e;let t=new Map;for(let n of i){let r=n;do{let s=((e=t.get(r))!=null?e:0)+1;if(s===i.size)return r;t.set(r,s),r=r.parent}while(r!==null)}return null}var tp=class{constructor(){this._joints=new Set,this._sortedJoints=[],this._hasWarnedCircularDependency=!1,this._ancestors=[],this._objectSpringBonesMap=new Map,this._isSortedJointsDirty=!1,this._relevantChildrenUpdated=this._relevantChildrenUpdated.bind(this)}get joints(){return this._joints}get springBones(){return console.warn("VRMSpringBoneManager: springBones is deprecated. use joints instead."),this._joints}get colliderGroups(){let i=new Set;return this._joints.forEach(e=>{e.colliderGroups.forEach(t=>{i.add(t)})}),Array.from(i)}get colliders(){let i=new Set;return this.colliderGroups.forEach(e=>{e.colliders.forEach(t=>{i.add(t)})}),Array.from(i)}addJoint(i){this._joints.add(i);let e=this._objectSpringBonesMap.get(i.bone);e==null&&(e=new Set,this._objectSpringBonesMap.set(i.bone,e)),e.add(i),this._isSortedJointsDirty=!0}addSpringBone(i){console.warn("VRMSpringBoneManager: addSpringBone() is deprecated. use addJoint() instead."),this.addJoint(i)}deleteJoint(i){this._joints.delete(i),this._objectSpringBonesMap.get(i.bone).delete(i),this._isSortedJointsDirty=!0}deleteSpringBone(i){console.warn("VRMSpringBoneManager: deleteSpringBone() is deprecated. use deleteJoint() instead."),this.deleteJoint(i)}setInitState(){this._sortJoints();for(let i=0;i<this._sortedJoints.length;i++){let e=this._sortedJoints[i];e.bone.updateMatrix(),e.bone.updateWorldMatrix(!1,!1),e.setInitState()}}reset(){this._sortJoints();for(let i=0;i<this._sortedJoints.length;i++){let e=this._sortedJoints[i];e.bone.updateMatrix(),e.bone.updateWorldMatrix(!1,!1),e.reset()}}update(i){this._sortJoints();for(let e=0;e<this._ancestors.length;e++)this._ancestors[e].updateWorldMatrix(e===0,!1);for(let e=0;e<this._sortedJoints.length;e++){let t=this._sortedJoints[e];t.bone.updateMatrix(),t.bone.updateWorldMatrix(!1,!1),t.update(i),qu(t.bone,this._relevantChildrenUpdated)}}_sortJoints(){if(!this._isSortedJointsDirty)return;let i=[],e=new Set,t=new Set,n=new Set;for(let s of this._joints)this._insertJointSort(s,e,t,i,n);this._sortedJoints=i;let r=eE(n);this._ancestors=[],r&&(this._ancestors.push(r),qu(r,s=>{var o,a;return((a=(o=this._objectSpringBonesMap.get(s))==null?void 0:o.size)!=null?a:0)>0?!0:(this._ancestors.push(s),!1)})),this._isSortedJointsDirty=!1}_insertJointSort(i,e,t,n,r){if(t.has(i))return;if(e.has(i)){this._hasWarnedCircularDependency||(console.warn("VRMSpringBoneManager: Circular dependency detected"),this._hasWarnedCircularDependency=!0);return}e.add(i);let s=i.dependencies;for(let o of s){let a=!1,l=null;QM(o,c=>{let u=this._objectSpringBonesMap.get(c);if(u)for(let h of u)a=!0,this._insertJointSort(h,e,t,n,r);else a||(l=c)}),l&&r.add(l)}n.push(i),t.add(i)}_relevantChildrenUpdated(i){var e,t;return((t=(e=this._objectSpringBonesMap.get(i))==null?void 0:e.size)!=null?t:0)>0?!0:(i.updateWorldMatrix(!1,!1),!1)}},np="VRMC_springBone_extended_collider",tE=new Set(["1.0","1.0-beta"]),nE=new Set(["1.0"]),bp=class ts{get name(){return ts.EXTENSION_NAME}constructor(e,t){var n;this.parser=e,this.jointHelperRoot=t==null?void 0:t.jointHelperRoot,this.colliderHelperRoot=t==null?void 0:t.colliderHelperRoot,this.useExtendedColliders=(n=t==null?void 0:t.useExtendedColliders)!=null?n:!0}afterRoot(e){return cl(this,null,function*(){e.userData.vrmSpringBoneManager=yield this._import(e)})}_import(e){return cl(this,null,function*(){let t=yield this._v1Import(e);if(t!=null)return t;let n=yield this._v0Import(e);return n!=null?n:null})}_v1Import(e){return cl(this,null,function*(){var t,n,r,s,o;let a=e.parser.json;if(!(((t=a.extensionsUsed)==null?void 0:t.indexOf(ts.EXTENSION_NAME))!==-1))return null;let c=new tp,u=yield e.parser.getDependencies("node"),h=(n=a.extensions)==null?void 0:n[ts.EXTENSION_NAME];if(!h)return null;let d=h.specVersion;if(!tE.has(d))return console.warn(`VRMSpringBoneLoaderPlugin: Unknown ${ts.EXTENSION_NAME} specVersion "${d}"`),null;let f=(r=h.colliders)==null?void 0:r.map((_,g)=>{var m,y,S,v,A,R,I,L,M,T,C,H,z,G,$;let W=u[_.node];if(W==null)return console.warn(`VRMSpringBoneLoaderPlugin: The collider #${g} attempted to reference a node #${_.node} but not found. Skipping the collider`),null;let J=_.shape,V=(m=_.extensions)==null?void 0:m[np];if(this.useExtendedColliders&&V!=null){let le=V.specVersion;if(!nE.has(le))console.warn(`VRMSpringBoneLoaderPlugin: Unknown ${np} specVersion "${le}". Fallbacking to the ${ts.EXTENSION_NAME} definition`);else{let se=V.shape;if(se.sphere)return this._importSphereCollider(W,{offset:new w().fromArray((y=se.sphere.offset)!=null?y:[0,0,0]),radius:(S=se.sphere.radius)!=null?S:0,inside:(v=se.sphere.inside)!=null?v:!1});if(se.capsule)return this._importCapsuleCollider(W,{offset:new w().fromArray((A=se.capsule.offset)!=null?A:[0,0,0]),radius:(R=se.capsule.radius)!=null?R:0,tail:new w().fromArray((I=se.capsule.tail)!=null?I:[0,0,0]),inside:(L=se.capsule.inside)!=null?L:!1});if(se.plane)return this._importPlaneCollider(W,{offset:new w().fromArray((M=se.plane.offset)!=null?M:[0,0,0]),normal:new w().fromArray((T=se.plane.normal)!=null?T:[0,0,1])})}}if(J.sphere)return this._importSphereCollider(W,{offset:new w().fromArray((C=J.sphere.offset)!=null?C:[0,0,0]),radius:(H=J.sphere.radius)!=null?H:0,inside:!1});if(J.capsule)return this._importCapsuleCollider(W,{offset:new w().fromArray((z=J.capsule.offset)!=null?z:[0,0,0]),radius:(G=J.capsule.radius)!=null?G:0,tail:new w().fromArray(($=J.capsule.tail)!=null?$:[0,0,0]),inside:!1});console.warn(`VRMSpringBoneLoaderPlugin: The collider #${g} has no valid shape. Skipping the collider`)}),p=(s=h.colliderGroups)==null?void 0:s.map((_,g)=>{var m;return{colliders:((m=_.colliders)!=null?m:[]).map(S=>{let v=f==null?void 0:f[S];return v==null?(console.warn(`VRMSpringBoneLoaderPlugin: The collider group #${g} attempted to reference a collider #${S} but not found. Skipping the collider`),null):v}).filter(S=>S!=null),name:_.name}});return(o=h.springs)==null||o.forEach((_,g)=>{var m;let y=_.joints,S=(m=_.colliderGroups)==null?void 0:m.map(R=>{let I=p==null?void 0:p[R];return I==null?(console.warn(`VRMSpringBoneLoaderPlugin: The spring #${g} attempted to reference a collider group #${R} but not found. Skipping the collider group`),null):I}).filter(R=>R!=null),v=_.center!=null?u[_.center]:void 0,A;y.forEach(R=>{if(A){let I=A.node,L=u[I],M=R.node,T=u[M],C={hitRadius:A.hitRadius,dragForce:A.dragForce,gravityPower:A.gravityPower,stiffness:A.stiffness,gravityDir:A.gravityDir!=null?new w().fromArray(A.gravityDir):void 0},H=this._importJoint(L,T,C,S);v&&(H.center=v),c.addJoint(H)}A=R})}),c.setInitState(),c})}_v0Import(e){return cl(this,null,function*(){var t,n,r;let s=e.parser.json;if(!(((t=s.extensionsUsed)==null?void 0:t.indexOf("VRM"))!==-1))return null;let a=(n=s.extensions)==null?void 0:n.VRM,l=a==null?void 0:a.secondaryAnimation;if(!l)return null;let c=l==null?void 0:l.boneGroups;if(!c)return null;let u=new tp,h=yield e.parser.getDependencies("node"),d=(r=l.colliderGroups)==null?void 0:r.map((f,p)=>{var _;let g=h[f.node];return g==null?(console.warn(`VRMSpringBoneLoaderPlugin: The collider group #${p} attempted to reference a node #${f.node} but not found. Skipping the collider group`),null):{colliders:((_=f.colliders)!=null?_:[]).map((y,S)=>{var v,A,R;let I=new w(0,0,0);return y.offset&&I.set((v=y.offset.x)!=null?v:0,(A=y.offset.y)!=null?A:0,y.offset.z?-y.offset.z:0),this._importSphereCollider(g,{offset:I,radius:(R=y.radius)!=null?R:0,inside:!1})})}});return c==null||c.forEach((f,p)=>{let _=f.bones;_&&_.forEach(g=>{var m,y,S,v;let A=h[g];if(A==null){console.warn(`VRMSpringBoneLoaderPlugin: The spring bone group #${p} attempted to reference a node #${g} but not found. Skipping the node`);return}let R=new w;f.gravityDir?R.set((m=f.gravityDir.x)!=null?m:0,(y=f.gravityDir.y)!=null?y:0,(S=f.gravityDir.z)!=null?S:0):R.set(0,-1,0);let I=f.center!=null?h[f.center]:void 0,L={hitRadius:f.hitRadius,dragForce:f.dragForce,gravityPower:f.gravityPower,stiffness:f.stiffiness,gravityDir:R},M=(v=f.colliderGroups)==null?void 0:v.map(T=>{let C=d==null?void 0:d[T];return C==null?(console.warn(`VRMSpringBoneLoaderPlugin: The spring #${p} attempted to reference a collider group #${T} but not found. Skipping the collider group`),null):C}).filter(T=>T!=null);A.traverse(T=>{var C;let H=(C=T.children[0])!=null?C:null,z=this._importJoint(T,H,L,M);I&&(z.center=I),u.addJoint(z)})})}),e.scene.updateMatrixWorld(),u.setInitState(),u})}_importJoint(e,t,n,r){let s=new JM(e,t,n,r);if(this.jointHelperRoot){let o=new qM(s);this.jointHelperRoot.add(o),o.renderOrder=this.jointHelperRoot.renderOrder}return s}_importSphereCollider(e,t){let n=new Tp(t),r=new Bu(n);if(e.add(r),this.colliderHelperRoot){let s=new Fu(r);this.colliderHelperRoot.add(s),s.renderOrder=this.colliderHelperRoot.renderOrder}return r}_importCapsuleCollider(e,t){let n=new Ep(t),r=new Bu(n);if(e.add(r),this.colliderHelperRoot){let s=new Fu(r);this.colliderHelperRoot.add(s),s.renderOrder=this.colliderHelperRoot.renderOrder}return r}_importPlaneCollider(e,t){let n=new Sp(t),r=new Bu(n);if(e.add(r),this.colliderHelperRoot){let s=new Fu(r);this.colliderHelperRoot.add(s),s.renderOrder=this.colliderHelperRoot.renderOrder}return r}};bp.EXTENSION_NAME="VRMC_springBone";var iE=bp,wp=class{get name(){return"VRMLoaderPlugin"}constructor(i,e){var t,n,r,s,o,a,l,c,u,h;this.parser=i;let d=e==null?void 0:e.helperRoot,f=e==null?void 0:e.autoUpdateHumanBones;this.expressionPlugin=(t=e==null?void 0:e.expressionPlugin)!=null?t:new yy(i),this.firstPersonPlugin=(n=e==null?void 0:e.firstPersonPlugin)!=null?n:new Ey(i),this.humanoidPlugin=(r=e==null?void 0:e.humanoidPlugin)!=null?r:new Cy(i,{helperRoot:d,autoUpdateHumanBones:f}),this.lookAtPlugin=(s=e==null?void 0:e.lookAtPlugin)!=null?s:new Wy(i,{helperRoot:d}),this.metaPlugin=(o=e==null?void 0:e.metaPlugin)!=null?o:new Yy(i),this.mtoonMaterialPlugin=(a=e==null?void 0:e.mtoonMaterialPlugin)!=null?a:new lM(i),this.materialsHDREmissiveMultiplierPlugin=(l=e==null?void 0:e.materialsHDREmissiveMultiplierPlugin)!=null?l:new uM(i),this.materialsV0CompatPlugin=(c=e==null?void 0:e.materialsV0CompatPlugin)!=null?c:new _M(i),this.springBonePlugin=(u=e==null?void 0:e.springBonePlugin)!=null?u:new iE(i,{colliderHelperRoot:d,jointHelperRoot:d}),this.nodeConstraintPlugin=(h=e==null?void 0:e.nodeConstraintPlugin)!=null?h:new BM(i,{helperRoot:d})}beforeRoot(){return ol(this,null,function*(){yield this.materialsV0CompatPlugin.beforeRoot(),yield this.mtoonMaterialPlugin.beforeRoot()})}loadMesh(i){return ol(this,null,function*(){return yield this.mtoonMaterialPlugin.loadMesh(i)})}getMaterialType(i){let e=this.mtoonMaterialPlugin.getMaterialType(i);return e!=null?e:null}extendMaterialParams(i,e){return ol(this,null,function*(){yield this.materialsHDREmissiveMultiplierPlugin.extendMaterialParams(i,e),yield this.mtoonMaterialPlugin.extendMaterialParams(i,e)})}afterRoot(i){return ol(this,null,function*(){yield this.metaPlugin.afterRoot(i),yield this.humanoidPlugin.afterRoot(i),yield this.expressionPlugin.afterRoot(i),yield this.lookAtPlugin.afterRoot(i),yield this.firstPersonPlugin.afterRoot(i),yield this.springBonePlugin.afterRoot(i),yield this.nodeConstraintPlugin.afterRoot(i),yield this.mtoonMaterialPlugin.afterRoot(i);let e=i.userData.vrmMeta,t=i.userData.vrmHumanoid;if(e&&t){let n=new $y({scene:i.scene,expressionManager:i.userData.vrmExpressionManager,firstPerson:i.userData.vrmFirstPerson,humanoid:t,lookAt:i.userData.vrmLookAt,meta:e,materials:i.userData.vrmMToonMaterials,springBoneManager:i.userData.vrmSpringBoneManager,nodeConstraintManager:i.userData.vrmNodeConstraintManager});i.userData.vrm=n}})}};function rE(i){let e=new Set;return i.traverse(t=>{if(!t.isMesh)return;let n=t;e.add(n)}),e}function ip(i,e,t){if(e.size===1){let o=e.values().next().value;if(o.weight===1)return i[o.index]}let n=new Float32Array(i[0].count*3),r=0;if(t)r=1;else for(let o of e)r+=o.weight;for(let o of e){let a=i[o.index],l=o.weight/r;for(let c=0;c<a.count;c++)n[c*3+0]+=a.getX(c)*l,n[c*3+1]+=a.getY(c)*l,n[c*3+2]+=a.getZ(c)*l}return new ke(n,3)}function sE(i){var e;let t=rE(i.scene),n=new Map,r=(e=i.expressionManager)==null?void 0:e.expressionMap;if(r!=null)for(let[s,o]of Object.entries(r)){let a=new Set;for(let l of o.binds)if(l instanceof fl){if(l.weight!==0)for(let c of l.primitives){let u=n.get(c);u==null&&(u=new Map,n.set(c,u));let h=u.get(s);h==null&&(h=new Set,u.set(s,h)),h.add(l)}a.add(l)}for(let l of a)o.deleteBind(l)}for(let s of t){let o=n.get(s);if(o==null)continue;let a=s.geometry.morphAttributes;s.geometry.morphAttributes={};let l=s.geometry.clone();s.geometry=l;let c=l.morphTargetsRelative,u=a.position!=null,h=a.normal!=null,d={},f={},p=[];if(u||h){u&&(d.position=[]),h&&(d.normal=[]);let _=0;for(let[g,m]of o)u&&(d.position[_]=ip(a.position,m,c)),h&&(d.normal[_]=ip(a.normal,m,c)),r==null||r[g].addBind(new fl({index:_,weight:1,primitives:[s]})),f[g]=_,p.push(0),_++}l.morphAttributes=d,s.morphTargetDictionary=f,s.morphTargetInfluences=p}}function ml(i,e,t){if(i.getComponent)return i.getComponent(e,t);{let n=i.array[e*i.itemSize+t];return i.normalized&&(n=De.denormalize(n,i.array)),n}}function Ap(i,e,t,n){i.setComponent?i.setComponent(e,t,n):(i.normalized&&(n=De.normalize(n,i.array)),i.array[e*i.itemSize+t]=n)}function oE(i){var e;let t=aE(i),n=new Set;for(let h of t)n.has(h.geometry)&&(h.geometry=fE(h.geometry)),n.add(h.geometry);let r=new Map;for(let h of n){let d=h.getAttribute("skinIndex"),f=(e=r.get(d))!=null?e:new Map;r.set(d,f);let p=h.getAttribute("skinWeight"),_=lE(d,p);f.set(p,_)}let s=new Map;for(let h of t){let d=cE(h,r);s.set(h,d)}let o=[];for(let[h,d]of s){let f=!1;for(let p of o)if(uE(d,p.boneInverseMap)){f=!0,p.meshes.add(h);for(let[g,m]of d)p.boneInverseMap.set(g,m);break}f||o.push({boneInverseMap:d,meshes:new Set([h])})}let a=new Map,l=new Hu,c=new Hu,u=new Hu;for(let h of o){let{boneInverseMap:d,meshes:f}=h,p=Array.from(d.keys()),_=Array.from(d.values()),g=new nn(p,_),m=c.getOrCreate(g);for(let y of f){let S=y.geometry.getAttribute("skinIndex"),v=l.getOrCreate(S),A=y.skeleton.bones,R=A.map(M=>u.getOrCreate(M)).join(","),I=`${v};${m};${R}`,L=a.get(I);L==null&&(L=S.clone(),hE(L,A,p),a.set(I,L)),y.geometry.setAttribute("skinIndex",L)}for(let y of f)y.bind(g,new ve)}}function aE(i){let e=new Set;return i.traverse(t=>{if(!t.isSkinnedMesh)return;let n=t;e.add(n)}),e}function lE(i,e){let t=new Set;for(let n=0;n<i.count;n++)for(let r=0;r<i.itemSize;r++){let s=ml(i,n,r);ml(e,n,r)!==0&&t.add(s)}return t}function cE(i,e){let t=new Map,n=i.skeleton,r=i.geometry,s=r.getAttribute("skinIndex"),o=r.getAttribute("skinWeight"),a=e.get(s),l=a==null?void 0:a.get(o);if(!l)throw new Error("Unreachable. attributeUsedIndexSetMap does not know the skin index attribute or the skin weight attribute.");for(let c of l)t.set(n.bones[c],n.boneInverses[c]);return t}function uE(i,e){for(let[t,n]of i.entries()){let r=e.get(t);if(r!=null&&!dE(n,r))return!1}return!0}function hE(i,e,t){let n=new Map;for(let s of e)n.set(s,n.size);let r=new Map;for(let[s,o]of t.entries()){let a=n.get(o);r.set(a,s)}for(let s=0;s<i.count;s++)for(let o=0;o<i.itemSize;o++){let a=ml(i,s,o),l=r.get(a);Ap(i,s,o,l)}i.needsUpdate=!0}function dE(i,e,t){if(t=t||1e-4,i.elements.length!=e.elements.length)return!1;for(let n=0,r=i.elements.length;n<r;n++)if(Math.abs(i.elements[n]-e.elements[n])>t)return!1;return!0}var Hu=class{constructor(){this._objectIndexMap=new Map,this._index=0}get(i){return this._objectIndexMap.get(i)}getOrCreate(i){let e=this._objectIndexMap.get(i);return e==null&&(e=this._index,this._objectIndexMap.set(i,e),this._index++),e}};function fE(i){var e,t,n,r;let s=new nt;s.name=i.name,s.setIndex(i.index);for(let[o,a]of Object.entries(i.attributes))s.setAttribute(o,a);for(let[o,a]of Object.entries(i.morphAttributes)){let l=o;s.morphAttributes[l]=a.concat()}s.morphTargetsRelative=i.morphTargetsRelative,s.groups=[];for(let o of i.groups)s.addGroup(o.start,o.count,o.materialIndex);return s.boundingSphere=(t=(e=i.boundingSphere)==null?void 0:e.clone())!=null?t:null,s.boundingBox=(r=(n=i.boundingBox)==null?void 0:n.clone())!=null?r:null,s.drawRange.start=i.drawRange.start,s.drawRange.count=i.drawRange.count,s.userData=i.userData,s}function rp(i){if(Object.values(i).forEach(e=>{e!=null&&e.isTexture&&e.dispose()}),i.isShaderMaterial){let e=i.uniforms;e&&Object.values(e).forEach(t=>{let n=t.value;n!=null&&n.isTexture&&n.dispose()})}i.dispose()}function pE(i){let e=i.geometry;e&&e.dispose();let t=i.skeleton;t&&t.dispose();let n=i.material;n&&(Array.isArray(n)?n.forEach(r=>rp(r)):n&&rp(n))}function mE(i){i.traverse(pE)}function gE(i,e){var t,n;console.warn("VRMUtils.removeUnnecessaryJoints: removeUnnecessaryJoints is deprecated. Use combineSkeletons instead. combineSkeletons contributes more to the performance improvement. This function will be removed in the next major version.");let r=(t=e==null?void 0:e.experimentalSameBoneCounts)!=null?t:!1,s=[];i.traverse(l=>{l.type==="SkinnedMesh"&&s.push(l)});let o=new Map,a=0;for(let l of s){let u=l.geometry.getAttribute("skinIndex");if(o.has(u))continue;let h=new Map,d=new Map;for(let f=0;f<u.count;f++)for(let p=0;p<u.itemSize;p++){let _=ml(u,f,p),g=h.get(_);g==null&&(g=h.size,h.set(_,g),d.set(g,_)),Ap(u,f,p,g)}u.needsUpdate=!0,o.set(u,d),a=Math.max(a,h.size)}for(let l of s){let u=l.geometry.getAttribute("skinIndex"),h=o.get(u),d=[],f=[],p=r?a:h.size;for(let g=0;g<p;g++){let m=(n=h.get(g))!=null?n:0;d.push(l.skeleton.bones[m]),f.push(l.skeleton.boneInverses[m])}let _=new nn(d,f);l.bind(_,new ve)}}function _E(i,e){let t=i.position.count,n=new Array(t),r=0,s=e.array;for(let o=0;o<s.length;o++){let a=s[o];n[a]||(n[a]=!0,r++)}return{isVertexUsed:n,vertexCount:t,verticesUsed:r}}function xE(i){let e=[],t=[],n=0;for(let r=0;r<i.length;r++)if(i[r]){let s=n++;e[r]=s,t[s]=r}return{originalIndexNewIndexMap:e,newIndexOriginalIndexMap:t}}function vE(i,e){var t,n,r,s;e.name=i.name,e.morphTargetsRelative=i.morphTargetsRelative,i.groups.forEach(o=>{e.addGroup(o.start,o.count,o.materialIndex)}),e.boundingBox=(n=(t=i.boundingBox)==null?void 0:t.clone())!=null?n:null,e.boundingSphere=(s=(r=i.boundingSphere)==null?void 0:r.clone())!=null?s:null,e.setDrawRange(i.drawRange.start,i.drawRange.count),e.userData=i.userData}function yE(i,e,t){let n=e.array,r=new n.constructor(n.length);for(let s=0;s<n.length;s++){let o=n[s];r[s]=t[o]}i.setIndex(new ke(r,e.itemSize,e.normalized))}function gl(i,e,t){let n=i.constructor,r=new n(e.length*t),s=!0;for(let o=0;o<e.length;o++){let l=e[o]*t,c=o*t;for(let u=0;u<t;u++){let h=i[l+u];r[c+u]=h,s=s&&h===0}}return[r,s]}function ME(i){var e;let t=new Map,n=[];for(let[r,s]of Object.entries(i))if(s.isInterleavedBufferAttribute){let o=s,a=o.data,l=(e=t.get(a))!=null?e:[];t.set(a,l),l.push([r,o])}else{let o=s;n.push([r,o])}return[t,n]}function EE(i,e,t){let[n,r]=ME(e);for(let[s,o]of n){let a=s.array,{stride:l}=s,[c,u]=gl(a,t,l),h=new $n(c,l);h.setUsage(s.usage);for(let[d,f]of o){let{itemSize:p,offset:_,normalized:g}=f,m=new jn(h,p,_,g);i.setAttribute(d,m)}}for(let[s,o]of r){let a=o.array,{itemSize:l,normalized:c}=o,[u,h]=gl(a,t,l);i.setAttribute(s,new ke(u,l,c))}}function SE(i){var e;let t=new Map,n=[];for(let[r,s]of Object.entries(i)){let o=r;for(let a=0;a<s.length;a++){let l=s[a];if(l.isInterleavedBufferAttribute){let c=l,u=c.data,h=(e=t.get(u))!=null?e:[];t.set(u,h),h.push([o,a,c])}else{let c=l;n.push([o,a,c])}}}return[t,n]}function TE(i,e,t){var n,r;let s=!0,[o,a]=SE(e),l={};for(let[c,u]of o){let h=c.array,{stride:d}=c,[f,p]=gl(h,t,d);s=s&&p;let _=new $n(f,d);_.setUsage(c.usage);for(let[g,m,y]of u){let{itemSize:S,offset:v,normalized:A}=y,R=new jn(_,S,v,A);(n=l[g])!=null||(l[g]=[]),l[g][m]=R}}for(let[c,u,h]of a){let d=h,f=d.array,{itemSize:p,normalized:_}=d,[g,m]=gl(f,t,p);s=s&&m,(r=l[c])!=null||(l[c]=[]),l[c][u]=new ke(g,p,_)}i.morphAttributes=s?{}:l}function bE(i){let e=new Map;i.traverse(t=>{if(!t.isMesh)return;let n=t,r=n.geometry,s=r.index;if(s==null)return;let o=e.get(r);if(o!=null){n.geometry=o;return}let{isVertexUsed:a,vertexCount:l,verticesUsed:c}=_E(r.attributes,s);if(c===l)return;let{originalIndexNewIndexMap:u,newIndexOriginalIndexMap:h}=xE(a),d=new nt;vE(r,d),e.set(r,d),yE(d,s,u),EE(d,r.attributes,h),TE(d,r.morphAttributes,h),n.geometry=d}),Array.from(e.keys()).forEach(t=>{t.dispose()})}function wE(i){var e;((e=i.meta)==null?void 0:e.metaVersion)==="0"&&(i.scene.rotation.y=Math.PI)}var ci=class{constructor(){}};ci.combineMorphs=sE;ci.combineSkeletons=oE;ci.deepDispose=mE;ci.removeUnnecessaryJoints=gE;ci.removeUnnecessaryVertices=bE;ci.rotateVRM0=wE;var Rp=(i,e,t)=>new Promise((n,r)=>{var s=l=>{try{a(t.next(l))}catch(c){r(c)}},o=l=>{try{a(t.throw(l))}catch(c){r(c)}},a=l=>l.done?n(l.value):Promise.resolve(l.value).then(s,o);a((t=t.apply(i,e)).next())}),_n=(i,e,t)=>new Promise((n,r)=>{var s=l=>{try{a(t.next(l))}catch(c){r(c)}},o=l=>{try{a(t.throw(l))}catch(c){r(c)}},a=l=>l.done?n(l.value):Promise.resolve(l.value).then(s,o);a((t=t.apply(i,e)).next())}),Cp=class extends Qe{constructor(i){super(),this.weight=0,this.isBinary=!1,this.overrideBlink="none",this.overrideLookAt="none",this.overrideMouth="none",this._binds=[],this.name=`VRMExpression_${i}`,this.expressionName=i,this.type="VRMExpression",this.visible=!1}get binds(){return this._binds}get overrideBlinkAmount(){return this.overrideBlink==="block"?0<this.outputWeight?1:0:this.overrideBlink==="blend"?this.outputWeight:0}get overrideLookAtAmount(){return this.overrideLookAt==="block"?0<this.outputWeight?1:0:this.overrideLookAt==="blend"?this.outputWeight:0}get overrideMouthAmount(){return this.overrideMouth==="block"?0<this.outputWeight?1:0:this.overrideMouth==="blend"?this.outputWeight:0}get outputWeight(){return this.isBinary?this.weight>.5?1:0:this.weight}addBind(i){this._binds.push(i)}deleteBind(i){let e=this._binds.indexOf(i);e>=0&&this._binds.splice(e,1)}applyWeight(i){var e;let t=this.outputWeight;t*=(e=i==null?void 0:i.multiplier)!=null?e:1,this.isBinary&&t<1&&(t=0),this._binds.forEach(n=>n.applyWeight(t))}clearAppliedWeight(){this._binds.forEach(i=>i.clearAppliedWeight())}};function AE(i,e,t){var n,r;let s=i.parser.json,o=(n=s.nodes)==null?void 0:n[e];if(o==null)return console.warn(`extractPrimitivesInternal: Attempt to use nodes[${e}] of glTF but the node doesn't exist`),null;let a=o.mesh;if(a==null)return null;let l=(r=s.meshes)==null?void 0:r[a];if(l==null)return console.warn(`extractPrimitivesInternal: Attempt to use meshes[${a}] of glTF but the mesh doesn't exist`),null;let c=l.primitives.length,u=[];return t.traverse(h=>{u.length<c&&h.isMesh&&u.push(h)}),u}function Pp(i,e){return _n(this,null,function*(){let t=yield i.parser.getDependency("node",e);return AE(i,e,t)})}var xl={Aa:"aa",Ih:"ih",Ou:"ou",Ee:"ee",Oh:"oh",Blink:"blink",Happy:"happy",Angry:"angry",Sad:"sad",Relaxed:"relaxed",LookUp:"lookUp",Surprised:"surprised",LookDown:"lookDown",LookLeft:"lookLeft",LookRight:"lookRight",BlinkLeft:"blinkLeft",BlinkRight:"blinkRight",Neutral:"neutral"};function RE(i){return Math.max(Math.min(i,1),0)}var Ip=class Xp{constructor(){this.blinkExpressionNames=["blink","blinkLeft","blinkRight"],this.lookAtExpressionNames=["lookLeft","lookRight","lookUp","lookDown"],this.mouthExpressionNames=["aa","ee","ih","oh","ou"],this._expressions=[],this._expressionMap={}}get expressions(){return this._expressions.concat()}get expressionMap(){return Object.assign({},this._expressionMap)}get presetExpressionMap(){let e={},t=new Set(Object.values(xl));return Object.entries(this._expressionMap).forEach(([n,r])=>{t.has(n)&&(e[n]=r)}),e}get customExpressionMap(){let e={},t=new Set(Object.values(xl));return Object.entries(this._expressionMap).forEach(([n,r])=>{t.has(n)||(e[n]=r)}),e}copy(e){return this._expressions.concat().forEach(n=>{this.unregisterExpression(n)}),e._expressions.forEach(n=>{this.registerExpression(n)}),this.blinkExpressionNames=e.blinkExpressionNames.concat(),this.lookAtExpressionNames=e.lookAtExpressionNames.concat(),this.mouthExpressionNames=e.mouthExpressionNames.concat(),this}clone(){return new Xp().copy(this)}getExpression(e){var t;return(t=this._expressionMap[e])!=null?t:null}registerExpression(e){this._expressions.push(e),this._expressionMap[e.expressionName]=e}unregisterExpression(e){let t=this._expressions.indexOf(e);t===-1&&console.warn("VRMExpressionManager: The specified expressions is not registered"),this._expressions.splice(t,1),delete this._expressionMap[e.expressionName]}getValue(e){var t;let n=this.getExpression(e);return(t=n==null?void 0:n.weight)!=null?t:null}setValue(e,t){let n=this.getExpression(e);n&&(n.weight=RE(t))}resetValues(){this._expressions.forEach(e=>{e.weight=0})}getExpressionTrackName(e){let t=this.getExpression(e);return t?`${t.name}.weight`:null}update(){let e=this._calculateWeightMultipliers();this._expressions.forEach(t=>{t.clearAppliedWeight()}),this._expressions.forEach(t=>{let n=1,r=t.expressionName;this.blinkExpressionNames.indexOf(r)!==-1&&(n*=e.blink),this.lookAtExpressionNames.indexOf(r)!==-1&&(n*=e.lookAt),this.mouthExpressionNames.indexOf(r)!==-1&&(n*=e.mouth),t.applyWeight({multiplier:n})})}_calculateWeightMultipliers(){let e=1,t=1,n=1;return this._expressions.forEach(r=>{e-=r.overrideBlinkAmount,t-=r.overrideLookAtAmount,n-=r.overrideMouthAmount}),e=Math.max(0,e),t=Math.max(0,t),n=Math.max(0,n),{blink:e,lookAt:t,mouth:n}}},so={Color:"color",EmissionColor:"emissionColor",ShadeColor:"shadeColor",MatcapColor:"matcapColor",RimColor:"rimColor",OutlineColor:"outlineColor"},CE={_Color:so.Color,_EmissionColor:so.EmissionColor,_ShadeColor:so.ShadeColor,_RimColor:so.RimColor,_OutlineColor:so.OutlineColor},PE=new fe,qp=class Yp{constructor({material:e,type:t,targetValue:n,targetAlpha:r}){this.material=e,this.type=t,this.targetValue=n,this.targetAlpha=r!=null?r:1;let s=this._initColorBindState(),o=this._initAlphaBindState();this._state={color:s,alpha:o}}applyWeight(e){let{color:t,alpha:n}=this._state;if(t!=null){let{propertyName:r,deltaValue:s}=t,o=this.material[r];o!=null&&o.add(PE.copy(s).multiplyScalar(e))}if(n!=null){let{propertyName:r,deltaValue:s}=n;this.material[r]!=null&&(this.material[r]+=s*e)}}clearAppliedWeight(){let{color:e,alpha:t}=this._state;if(e!=null){let{propertyName:n,initialValue:r}=e,s=this.material[n];s!=null&&s.copy(r)}if(t!=null){let{propertyName:n,initialValue:r}=t;this.material[n]!=null&&(this.material[n]=r)}}_initColorBindState(){var e,t,n;let{material:r,type:s,targetValue:o}=this,a=this._getPropertyNameMap(),l=(t=(e=a==null?void 0:a[s])==null?void 0:e[0])!=null?t:null;if(l==null)return console.warn(`Tried to add a material color bind to the material ${(n=r.name)!=null?n:"(no name)"}, the type ${s} but the material or the type is not supported.`),null;let u=r[l].clone(),h=new fe(o.r-u.r,o.g-u.g,o.b-u.b);return{propertyName:l,initialValue:u,deltaValue:h}}_initAlphaBindState(){var e,t,n;let{material:r,type:s,targetAlpha:o}=this,a=this._getPropertyNameMap(),l=(t=(e=a==null?void 0:a[s])==null?void 0:e[1])!=null?t:null;if(l==null&&o!==1)return console.warn(`Tried to add a material alpha bind to the material ${(n=r.name)!=null?n:"(no name)"}, the type ${s} but the material or the type does not support alpha.`),null;if(l==null)return null;let c=r[l],u=o-c;return{propertyName:l,initialValue:c,deltaValue:u}}_getPropertyNameMap(){var e,t;return(t=(e=Object.entries(Yp._propertyNameMapMap).find(([n])=>this.material[n]===!0))==null?void 0:e[1])!=null?t:null}};qp._propertyNameMapMap={isMeshStandardMaterial:{color:["color","opacity"],emissionColor:["emissive",null]},isMeshBasicMaterial:{color:["color","opacity"]},isMToonMaterial:{color:["color","opacity"],emissionColor:["emissive",null],outlineColor:["outlineColorFactor",null],matcapColor:["matcapFactor",null],rimColor:["parametricRimColorFactor",null],shadeColor:["shadeColorFactor",null]}};var Lp=qp,Np=class{constructor({primitives:i,index:e,weight:t}){this.primitives=i,this.index=e,this.weight=t}applyWeight(i){this.primitives.forEach(e=>{var t;((t=e.morphTargetInfluences)==null?void 0:t[this.index])!=null&&(e.morphTargetInfluences[this.index]+=this.weight*i)})}clearAppliedWeight(){this.primitives.forEach(i=>{var e;((e=i.morphTargetInfluences)==null?void 0:e[this.index])!=null&&(i.morphTargetInfluences[this.index]=0)})}},Up=new Ae,Zp=class $p{constructor({material:e,scale:t,offset:n}){var r,s;this.material=e,this.scale=t,this.offset=n;let o=(r=Object.entries($p._propertyNamesMap).find(([a])=>e[a]===!0))==null?void 0:r[1];o==null?(console.warn(`Tried to add a texture transform bind to the material ${(s=e.name)!=null?s:"(no name)"} but the material is not supported.`),this._properties=[]):(this._properties=[],o.forEach(a=>{var l;let c=(l=e[a])==null?void 0:l.clone();if(!c)return null;e[a]=c;let u=c.offset.clone(),h=c.repeat.clone(),d=n.clone().sub(u),f=t.clone().sub(h);this._properties.push({name:a,initialOffset:u,deltaOffset:d,initialScale:h,deltaScale:f})}))}applyWeight(e){this._properties.forEach(t=>{let n=this.material[t.name];n!==void 0&&(n.offset.add(Up.copy(t.deltaOffset).multiplyScalar(e)),n.repeat.add(Up.copy(t.deltaScale).multiplyScalar(e)))})}clearAppliedWeight(){this._properties.forEach(e=>{let t=this.material[e.name];t!==void 0&&(t.offset.copy(e.initialOffset),t.repeat.copy(e.initialScale))})}};Zp._propertyNamesMap={isMeshStandardMaterial:["map","emissiveMap","bumpMap","normalMap","displacementMap","roughnessMap","metalnessMap","alphaMap"],isMeshBasicMaterial:["map","specularMap","alphaMap"],isMToonMaterial:["map","normalMap","emissiveMap","shadeMultiplyTexture","rimMultiplyTexture","outlineWidthMultiplyTexture","uvAnimationMaskTexture"]};var Dp=Zp,IE=new Set(["1.0","1.0-beta"]),LE=class jp{get name(){return"VRMExpressionLoaderPlugin"}constructor(e){this.parser=e}afterRoot(e){return _n(this,null,function*(){e.userData.vrmExpressionManager=yield this._import(e)})}_import(e){return _n(this,null,function*(){let t=yield this._v1Import(e);if(t)return t;let n=yield this._v0Import(e);return n||null})}_v1Import(e){return _n(this,null,function*(){var t,n;let r=this.parser.json;if(!(((t=r.extensionsUsed)==null?void 0:t.indexOf("VRMC_vrm"))!==-1))return null;let o=(n=r.extensions)==null?void 0:n.VRMC_vrm;if(!o)return null;let a=o.specVersion;if(!IE.has(a))return console.warn(`VRMExpressionLoaderPlugin: Unknown VRMC_vrm specVersion "${a}"`),null;let l=o.expressions;if(!l)return null;let c=new Set(Object.values(xl)),u=new Map;l.preset!=null&&Object.entries(l.preset).forEach(([d,f])=>{if(f!=null){if(!c.has(d)){console.warn(`VRMExpressionLoaderPlugin: Unknown preset name "${d}" detected. Ignoring the expression`);return}u.set(d,f)}}),l.custom!=null&&Object.entries(l.custom).forEach(([d,f])=>{if(c.has(d)){console.warn(`VRMExpressionLoaderPlugin: Custom expression cannot have preset name "${d}". Ignoring the expression`);return}u.set(d,f)});let h=new Ip;return yield Promise.all(Array.from(u.entries()).map(d=>_n(this,[d],function*([f,p]){var _,g,m,y,S,v,A;let R=new Cp(f);if(e.scene.add(R),R.isBinary=(_=p.isBinary)!=null?_:!1,R.overrideBlink=(g=p.overrideBlink)!=null?g:"none",R.overrideLookAt=(m=p.overrideLookAt)!=null?m:"none",R.overrideMouth=(y=p.overrideMouth)!=null?y:"none",(S=p.morphTargetBinds)==null||S.forEach(I=>_n(this,null,function*(){var L;if(I.node===void 0||I.index===void 0)return;let M=yield Pp(e,I.node),T=I.index;if(!M.every(C=>Array.isArray(C.morphTargetInfluences)&&T<C.morphTargetInfluences.length)){console.warn(`VRMExpressionLoaderPlugin: ${p.name} attempts to index morph #${T} but not found.`);return}R.addBind(new Np({primitives:M,index:T,weight:(L=I.weight)!=null?L:1}))})),p.materialColorBinds||p.textureTransformBinds){let I=[];e.scene.traverse(L=>{let M=L.material;M&&(Array.isArray(M)?I.push(...M):I.push(M))}),(v=p.materialColorBinds)==null||v.forEach(L=>_n(this,null,function*(){I.filter(T=>{var C;let H=(C=this.parser.associations.get(T))==null?void 0:C.materials;return L.material===H}).forEach(T=>{R.addBind(new Lp({material:T,type:L.type,targetValue:new fe().fromArray(L.targetValue),targetAlpha:L.targetValue[3]}))})})),(A=p.textureTransformBinds)==null||A.forEach(L=>_n(this,null,function*(){I.filter(T=>{var C;let H=(C=this.parser.associations.get(T))==null?void 0:C.materials;return L.material===H}).forEach(T=>{var C,H;R.addBind(new Dp({material:T,offset:new Ae().fromArray((C=L.offset)!=null?C:[0,0]),scale:new Ae().fromArray((H=L.scale)!=null?H:[1,1])}))})}))}h.registerExpression(R)}))),h})}_v0Import(e){return _n(this,null,function*(){var t;let n=this.parser.json,r=(t=n.extensions)==null?void 0:t.VRM;if(!r)return null;let s=r.blendShapeMaster;if(!s)return null;let o=new Ip,a=s.blendShapeGroups;if(!a)return o;let l=new Set;return yield Promise.all(a.map(c=>_n(this,null,function*(){var u;let h=c.presetName,d=h!=null&&jp.v0v1PresetNameMap[h]||null,f=d!=null?d:c.name;if(f==null){console.warn("VRMExpressionLoaderPlugin: One of custom expressions has no name. Ignoring the expression");return}if(l.has(f)){console.warn(`VRMExpressionLoaderPlugin: An expression preset ${h} has duplicated entries. Ignoring the expression`);return}l.add(f);let p=new Cp(f);e.scene.add(p),p.isBinary=(u=c.isBinary)!=null?u:!1,c.binds&&c.binds.forEach(g=>_n(this,null,function*(){var m;if(g.mesh===void 0||g.index===void 0)return;let y=[];if((m=n.nodes)==null||m.forEach((v,A)=>{v.mesh===g.mesh&&y.push(A)}),y.length===0){console.warn(`VRMExpressionLoaderPlugin: ${c.name} attempts to bind a morph target to the mesh #${g.mesh} but the mesh is not found or not used in the scene. Ignoring the bind.`);return}let S=g.index;yield Promise.all(y.map(v=>_n(this,null,function*(){var A;let R=yield Pp(e,v);if(!R.every(I=>Array.isArray(I.morphTargetInfluences)&&S<I.morphTargetInfluences.length)){console.warn(`VRMExpressionLoaderPlugin: ${c.name} attempts to index ${S}th morph but not found.`);return}p.addBind(new Np({primitives:R,index:S,weight:.01*((A=g.weight)!=null?A:100)}))})))}));let _=c.materialValues;_&&_.length!==0&&_.forEach(g=>{if(g.materialName===void 0||g.propertyName===void 0||g.targetValue===void 0)return;let m=[];e.scene.traverse(S=>{if(S.material){let v=S.material;Array.isArray(v)?m.push(...v.filter(A=>(A.name===g.materialName||A.name===g.materialName+" (Outline)")&&m.indexOf(A)===-1)):v.name===g.materialName&&m.indexOf(v)===-1&&m.push(v)}});let y=g.propertyName;m.forEach(S=>{if(y==="_MainTex_ST"){let A=new Ae(g.targetValue[0],g.targetValue[1]),R=new Ae(g.targetValue[2],g.targetValue[3]);R.y=1-R.y-A.y,p.addBind(new Dp({material:S,scale:A,offset:R}));return}let v=CE[y];if(v){p.addBind(new Lp({material:S,type:v,targetValue:new fe().fromArray(g.targetValue),targetAlpha:g.targetValue[3]}));return}console.warn(y+" is not supported")})}),o.registerExpression(p)}))),o})}};LE.v0v1PresetNameMap={a:"aa",e:"ee",i:"ih",o:"oh",u:"ou",blink:"blink",joy:"happy",angry:"angry",sorrow:"sad",fun:"relaxed",lookup:"lookUp",lookdown:"lookDown",lookleft:"lookLeft",lookright:"lookRight",blink_l:"blinkLeft",blink_r:"blinkRight",neutral:"neutral"};var Kp=class is{constructor(e,t){this._firstPersonOnlyLayer=is.DEFAULT_FIRSTPERSON_ONLY_LAYER,this._thirdPersonOnlyLayer=is.DEFAULT_THIRDPERSON_ONLY_LAYER,this._initializedLayers=!1,this.humanoid=e,this.meshAnnotations=t}copy(e){if(this.humanoid!==e.humanoid)throw new Error("VRMFirstPerson: humanoid must be same in order to copy");return this.meshAnnotations=e.meshAnnotations.map(t=>({meshes:t.meshes.concat(),type:t.type})),this}clone(){return new is(this.humanoid,this.meshAnnotations).copy(this)}get firstPersonOnlyLayer(){return this._firstPersonOnlyLayer}get thirdPersonOnlyLayer(){return this._thirdPersonOnlyLayer}setup({firstPersonOnlyLayer:e=is.DEFAULT_FIRSTPERSON_ONLY_LAYER,thirdPersonOnlyLayer:t=is.DEFAULT_THIRDPERSON_ONLY_LAYER}={}){this._initializedLayers||(this._firstPersonOnlyLayer=e,this._thirdPersonOnlyLayer=t,this.meshAnnotations.forEach(n=>{n.meshes.forEach(r=>{n.type==="firstPersonOnly"?(r.layers.set(this._firstPersonOnlyLayer),r.traverse(s=>s.layers.set(this._firstPersonOnlyLayer))):n.type==="thirdPersonOnly"?(r.layers.set(this._thirdPersonOnlyLayer),r.traverse(s=>s.layers.set(this._thirdPersonOnlyLayer))):n.type==="auto"&&this._createHeadlessModel(r)})}),this._initializedLayers=!0)}_excludeTriangles(e,t,n,r){let s=0;if(t!=null&&t.length>0)for(let o=0;o<e.length;o+=3){let a=e[o],l=e[o+1],c=e[o+2],u=t[a],h=n[a];if(u[0]>0&&r.includes(h[0])||u[1]>0&&r.includes(h[1])||u[2]>0&&r.includes(h[2])||u[3]>0&&r.includes(h[3]))continue;let d=t[l],f=n[l];if(d[0]>0&&r.includes(f[0])||d[1]>0&&r.includes(f[1])||d[2]>0&&r.includes(f[2])||d[3]>0&&r.includes(f[3]))continue;let p=t[c],_=n[c];p[0]>0&&r.includes(_[0])||p[1]>0&&r.includes(_[1])||p[2]>0&&r.includes(_[2])||p[3]>0&&r.includes(_[3])||(e[s++]=a,e[s++]=l,e[s++]=c)}return s}_createErasedMesh(e,t){let n=new Kn(e.geometry.clone(),e.material);n.name=`${e.name}(erase)`,n.frustumCulled=e.frustumCulled,n.layers.set(this._firstPersonOnlyLayer);let r=n.geometry,s=r.getAttribute("skinIndex"),o=s instanceof si?[]:s.array,a=[];for(let _=0;_<o.length;_+=4)a.push([o[_],o[_+1],o[_+2],o[_+3]]);let l=r.getAttribute("skinWeight"),c=l instanceof si?[]:l.array,u=[];for(let _=0;_<c.length;_+=4)u.push([c[_],c[_+1],c[_+2],c[_+3]]);let h=r.getIndex();if(!h)throw new Error("The geometry doesn't have an index buffer");let d=Array.from(h.array),f=this._excludeTriangles(d,u,a,t),p=[];for(let _=0;_<f;_++)p[_]=d[_];return r.setIndex(p),e.onBeforeRender&&(n.onBeforeRender=e.onBeforeRender),n.bind(new nn(e.skeleton.bones,e.skeleton.boneInverses),new ve),n}_createHeadlessModelForSkinnedMesh(e,t){let n=[];if(t.skeleton.bones.forEach((s,o)=>{this._isEraseTarget(s)&&n.push(o)}),!n.length){t.layers.enable(this._thirdPersonOnlyLayer),t.layers.enable(this._firstPersonOnlyLayer);return}t.layers.set(this._thirdPersonOnlyLayer);let r=this._createErasedMesh(t,n);e.add(r)}_createHeadlessModel(e){if(e.type==="Group")if(e.layers.set(this._thirdPersonOnlyLayer),this._isEraseTarget(e))e.traverse(t=>t.layers.set(this._thirdPersonOnlyLayer));else{let t=new mt;t.name=`_headless_${e.name}`,t.layers.set(this._firstPersonOnlyLayer),e.parent.add(t),e.children.filter(n=>n.type==="SkinnedMesh").forEach(n=>{let r=n;this._createHeadlessModelForSkinnedMesh(t,r)})}else if(e.type==="SkinnedMesh"){let t=e;this._createHeadlessModelForSkinnedMesh(e.parent,t)}else this._isEraseTarget(e)&&(e.layers.set(this._thirdPersonOnlyLayer),e.traverse(t=>t.layers.set(this._thirdPersonOnlyLayer)))}_isEraseTarget(e){return e===this.humanoid.getRawBoneNode("head")?!0:e.parent?this._isEraseTarget(e.parent):!1}};Kp.DEFAULT_FIRSTPERSON_ONLY_LAYER=9;Kp.DEFAULT_THIRDPERSON_ONLY_LAYER=10;var AA=new w,RA=new w,CA=new Q,Op={hips:null,spine:"hips",chest:"spine",upperChest:"chest",neck:"upperChest",head:"neck",leftEye:"head",rightEye:"head",jaw:"head",leftUpperLeg:"hips",leftLowerLeg:"leftUpperLeg",leftFoot:"leftLowerLeg",leftToes:"leftFoot",rightUpperLeg:"hips",rightLowerLeg:"rightUpperLeg",rightFoot:"rightLowerLeg",rightToes:"rightFoot",leftShoulder:"upperChest",leftUpperArm:"leftShoulder",leftLowerArm:"leftUpperArm",leftHand:"leftLowerArm",rightShoulder:"upperChest",rightUpperArm:"rightShoulder",rightLowerArm:"rightUpperArm",rightHand:"rightLowerArm",leftThumbMetacarpal:"leftHand",leftThumbProximal:"leftThumbMetacarpal",leftThumbDistal:"leftThumbProximal",leftIndexProximal:"leftHand",leftIndexIntermediate:"leftIndexProximal",leftIndexDistal:"leftIndexIntermediate",leftMiddleProximal:"leftHand",leftMiddleIntermediate:"leftMiddleProximal",leftMiddleDistal:"leftMiddleIntermediate",leftRingProximal:"leftHand",leftRingIntermediate:"leftRingProximal",leftRingDistal:"leftRingIntermediate",leftLittleProximal:"leftHand",leftLittleIntermediate:"leftLittleProximal",leftLittleDistal:"leftLittleIntermediate",rightThumbMetacarpal:"rightHand",rightThumbProximal:"rightThumbMetacarpal",rightThumbDistal:"rightThumbProximal",rightIndexProximal:"rightHand",rightIndexIntermediate:"rightIndexProximal",rightIndexDistal:"rightIndexIntermediate",rightMiddleProximal:"rightHand",rightMiddleIntermediate:"rightMiddleProximal",rightMiddleDistal:"rightMiddleIntermediate",rightRingProximal:"rightHand",rightRingIntermediate:"rightRingProximal",rightRingDistal:"rightRingIntermediate",rightLittleProximal:"rightHand",rightLittleIntermediate:"rightLittleProximal",rightLittleDistal:"rightLittleIntermediate"};function NE(i){return i.invert?i.invert():i.inverse(),i}var PA=new w,IA=new Q,LA=new w,NA=new Q,UA=new w,DA=new Q,OA=new Q,FA=new w,BA=new w,Fp=Math.sqrt(2)/2,kA=new Q(0,0,-Fp,Fp),HA=new w(0,1,0),UE=new w,DE=new w;function eh(i,e){return i.matrixWorld.decompose(UE,e,DE),e}function _l(i){return[Math.atan2(-i.z,i.x),Math.atan2(i.y,Math.sqrt(i.x*i.x+i.z*i.z))]}function Bp(i){let e=Math.round(i/2/Math.PI);return i-2*Math.PI*e}var kp=new w(0,0,1),OE=new w,FE=new w,BE=new w,kE=new Q,ju=new Q,Hp=new Q,HE=new Q,Ku=new gt,Jp=class Qp{constructor(e,t){this.offsetFromHeadBone=new w,this.autoUpdate=!0,this.faceFront=new w(0,0,1),this.humanoid=e,this.applier=t,this._yaw=0,this._pitch=0,this._needsUpdate=!0,this._restHeadWorldQuaternion=this.getLookAtWorldQuaternion(new Q)}get yaw(){return this._yaw}set yaw(e){this._yaw=e,this._needsUpdate=!0}get pitch(){return this._pitch}set pitch(e){this._pitch=e,this._needsUpdate=!0}get euler(){return console.warn("VRMLookAt: euler is deprecated. use getEuler() instead."),this.getEuler(new gt)}getEuler(e){return e.set(De.DEG2RAD*this._pitch,De.DEG2RAD*this._yaw,0,"YXZ")}copy(e){if(this.humanoid!==e.humanoid)throw new Error("VRMLookAt: humanoid must be same in order to copy");return this.offsetFromHeadBone.copy(e.offsetFromHeadBone),this.applier=e.applier,this.autoUpdate=e.autoUpdate,this.target=e.target,this.faceFront.copy(e.faceFront),this}clone(){return new Qp(this.humanoid,this.applier).copy(this)}reset(){this._yaw=0,this._pitch=0,this._needsUpdate=!0}getLookAtWorldPosition(e){let t=this.humanoid.getRawBoneNode("head");return e.copy(this.offsetFromHeadBone).applyMatrix4(t.matrixWorld)}getLookAtWorldQuaternion(e){let t=this.humanoid.getRawBoneNode("head");return eh(t,e)}getFaceFrontQuaternion(e){if(this.faceFront.distanceToSquared(kp)<.01)return e.copy(this._restHeadWorldQuaternion).invert();let[t,n]=_l(this.faceFront);return Ku.set(0,.5*Math.PI+t,n,"YZX"),e.setFromEuler(Ku).premultiply(HE.copy(this._restHeadWorldQuaternion).invert())}getLookAtWorldDirection(e){return this.getLookAtWorldQuaternion(ju),this.getFaceFrontQuaternion(Hp),e.copy(kp).applyQuaternion(ju).applyQuaternion(Hp).applyEuler(this.getEuler(Ku))}lookAt(e){let t=kE.copy(this._restHeadWorldQuaternion).multiply(NE(this.getLookAtWorldQuaternion(ju))),n=this.getLookAtWorldPosition(FE),r=BE.copy(e).sub(n).applyQuaternion(t).normalize(),[s,o]=_l(this.faceFront),[a,l]=_l(r),c=Bp(a-s),u=Bp(o-l);this._yaw=De.RAD2DEG*c,this._pitch=De.RAD2DEG*u,this._needsUpdate=!0}update(e){this.target!=null&&this.autoUpdate&&this.lookAt(this.target.getWorldPosition(OE)),this._needsUpdate&&(this._needsUpdate=!1,this.applier.applyYawPitch(this._yaw,this._pitch))}};Jp.EULER_ORDER="YXZ";var VE=Jp,zE=new w(0,0,1),kn=new Q,ns=new Q,gn=new gt(0,0,0,"YXZ"),GE=class{constructor(i,e,t,n,r){this.humanoid=i,this.rangeMapHorizontalInner=e,this.rangeMapHorizontalOuter=t,this.rangeMapVerticalDown=n,this.rangeMapVerticalUp=r,this.faceFront=new w(0,0,1),this._restQuatLeftEye=new Q,this._restQuatRightEye=new Q,this._restLeftEyeParentWorldQuat=new Q,this._restRightEyeParentWorldQuat=new Q;let s=this.humanoid.getRawBoneNode("leftEye"),o=this.humanoid.getRawBoneNode("rightEye");s&&(this._restQuatLeftEye.copy(s.quaternion),eh(s.parent,this._restLeftEyeParentWorldQuat)),o&&(this._restQuatRightEye.copy(o.quaternion),eh(o.parent,this._restRightEyeParentWorldQuat))}applyYawPitch(i,e){let t=this.humanoid.getRawBoneNode("leftEye"),n=this.humanoid.getRawBoneNode("rightEye"),r=this.humanoid.getNormalizedBoneNode("leftEye"),s=this.humanoid.getNormalizedBoneNode("rightEye");t&&(e<0?gn.x=-De.DEG2RAD*this.rangeMapVerticalDown.map(-e):gn.x=De.DEG2RAD*this.rangeMapVerticalUp.map(e),i<0?gn.y=-De.DEG2RAD*this.rangeMapHorizontalInner.map(-i):gn.y=De.DEG2RAD*this.rangeMapHorizontalOuter.map(i),kn.setFromEuler(gn),this._getWorldFaceFrontQuat(ns),r.quaternion.copy(ns).multiply(kn).multiply(ns.invert()),kn.copy(this._restLeftEyeParentWorldQuat),t.quaternion.copy(r.quaternion).multiply(kn).premultiply(kn.invert()).multiply(this._restQuatLeftEye)),n&&(e<0?gn.x=-De.DEG2RAD*this.rangeMapVerticalDown.map(-e):gn.x=De.DEG2RAD*this.rangeMapVerticalUp.map(e),i<0?gn.y=-De.DEG2RAD*this.rangeMapHorizontalOuter.map(-i):gn.y=De.DEG2RAD*this.rangeMapHorizontalInner.map(i),kn.setFromEuler(gn),this._getWorldFaceFrontQuat(ns),s.quaternion.copy(ns).multiply(kn).multiply(ns.invert()),kn.copy(this._restRightEyeParentWorldQuat),n.quaternion.copy(s.quaternion).multiply(kn).premultiply(kn.invert()).multiply(this._restQuatRightEye))}lookAt(i){console.warn("VRMLookAtBoneApplier: lookAt() is deprecated. use apply() instead.");let e=De.RAD2DEG*i.y,t=De.RAD2DEG*i.x;this.applyYawPitch(e,t)}_getWorldFaceFrontQuat(i){if(this.faceFront.distanceToSquared(zE)<.01)return i.identity();let[e,t]=_l(this.faceFront);return gn.set(0,.5*Math.PI+e,t,"YZX"),i.setFromEuler(gn)}};GE.type="bone";var WE=class{constructor(i,e,t,n,r){this.expressions=i,this.rangeMapHorizontalInner=e,this.rangeMapHorizontalOuter=t,this.rangeMapVerticalDown=n,this.rangeMapVerticalUp=r}applyYawPitch(i,e){e<0?(this.expressions.setValue("lookDown",0),this.expressions.setValue("lookUp",this.rangeMapVerticalUp.map(-e))):(this.expressions.setValue("lookUp",0),this.expressions.setValue("lookDown",this.rangeMapVerticalDown.map(e))),i<0?(this.expressions.setValue("lookLeft",0),this.expressions.setValue("lookRight",this.rangeMapHorizontalOuter.map(-i))):(this.expressions.setValue("lookRight",0),this.expressions.setValue("lookLeft",this.rangeMapHorizontalOuter.map(i)))}lookAt(i){console.warn("VRMLookAtBoneApplier: lookAt() is deprecated. use apply() instead.");let e=De.RAD2DEG*i.y,t=De.RAD2DEG*i.x;this.applyYawPitch(e,t)}};WE.type="expression";var Vp=180/Math.PI,Ju=new gt,zp=class extends Qe{constructor(i){super(),this.vrmLookAt=i,this.type="VRMLookAtQuaternionProxy";let e=this.rotation._onChangeCallback;this.rotation._onChange(()=>{e(),this._applyToLookAt()});let t=this.quaternion._onChangeCallback;this.quaternion._onChange(()=>{t(),this._applyToLookAt()})}_applyToLookAt(){Ju.setFromQuaternion(this.quaternion,VE.EULER_ORDER),this.vrmLookAt.yaw=Vp*Ju.y,this.vrmLookAt.pitch=Vp*Ju.x}};function XE(i,e,t){var n,r;let s=new Map,o=new Map;for(let[a,l]of i.humanoidTracks.rotation.entries()){let c=(n=e.getNormalizedBoneNode(a))==null?void 0:n.name;if(c!=null){let u=new dn(`${c}.quaternion`,l.times,l.values.map((h,d)=>t==="0"&&d%2===0?-h:h));o.set(a,u)}}for(let[a,l]of i.humanoidTracks.translation.entries()){let c=(r=e.getNormalizedBoneNode(a))==null?void 0:r.name;if(c!=null){let u=i.restHipsPosition.y,d=e.normalizedRestPose.hips.position[1]/u,f=l.clone();f.values=f.values.map((p,_)=>(t==="0"&&_%3!==1?-p:p)*d),f.name=`${c}.position`,s.set(a,f)}}return{translation:s,rotation:o}}function qE(i,e){let t=new Map,n=new Map;for(let[r,s]of i.expressionTracks.preset.entries()){let o=e.getExpressionTrackName(r);if(o!=null){let a=s.clone();a.name=o,t.set(r,a)}}for(let[r,s]of i.expressionTracks.custom.entries()){let o=e.getExpressionTrackName(r);if(o!=null){let a=s.clone();a.name=o,n.set(r,a)}}return{preset:t,custom:n}}function YE(i,e){if(i.lookAtTrack==null)return null;let t=i.lookAtTrack.clone();return t.name=e,t}function em(i,e){let t=[],n=XE(i,e.humanoid,e.meta.metaVersion);if(t.push(...n.translation.values()),t.push(...n.rotation.values()),e.expressionManager!=null){let r=qE(i,e.expressionManager);t.push(...r.preset.values()),t.push(...r.custom.values())}if(e.lookAt!=null){let r=e.scene.children.find(o=>o instanceof zp);r==null?(console.warn("createVRMAnimationClip: VRMLookAtQuaternionProxy is not found. Creating a new one automatically. To suppress this warning, create a VRMLookAtQuaternionProxy manually"),r=new zp(e.lookAt),r.name="VRMLookAtQuaternionProxy",e.scene.add(r)):r.name===""&&(console.warn("createVRMAnimationClip: VRMLookAtQuaternionProxy is found but its name is not set. Setting the name automatically. To suppress this warning, set the name manually"),r.name="VRMLookAtQuaternionProxy");let s=YE(i,`${r.name}.quaternion`);s!=null&&t.push(s)}return new ni("Clip",i.duration,t)}var ZE=class{constructor(){this.duration=0,this.restHipsPosition=new w,this.humanoidTracks={translation:new Map,rotation:new Map},this.expressionTracks={preset:new Map,custom:new Map},this.lookAtTrack=null}};function Gp(i,e){let t=i.length,n=[],r=[],s=0;for(let o=0;o<t;o++){let a=i[o];s<=0&&(s=e,r=[],n.push(r)),r.push(a),s--}return n}var $E=new ve,oo=new w,Qu=new Q,Wp=new Q,jE=new Q,KE=new Set(["1.0","1.0-draft"]),JE=new Set(Object.values(xl)),tm=class{constructor(i){this.parser=i}get name(){return"VRMC_vrm_animation"}afterRoot(i){return Rp(this,null,function*(){var e,t,n;let r=i.parser.json,s=r.extensionsUsed;if(s==null||s.indexOf(this.name)==-1)return;let o=(e=r.extensions)==null?void 0:e[this.name];if(o==null)return;let a=o.specVersion;if(a==null)console.warn("VRMAnimationLoaderPlugin: specVersion of the VRMA is not defined. Consider updating the animation file. Assuming the spec version is 1.0.");else{if(!KE.has(a)){console.warn(`VRMAnimationLoaderPlugin: Unknown VRMC_vrm_animation spec version: ${a}`);return}a==="1.0-draft"&&console.warn("VRMAnimationLoaderPlugin: Using a draft spec version: 1.0-draft. Some behaviors may be different. Consider updating the animation file.")}let l=this._createNodeMap(o),c=yield this._createBoneWorldMatrixMap(i,o),u=(n=(t=o.humanoid)==null?void 0:t.humanBones.hips)==null?void 0:n.node,h=u!=null?yield i.parser.getDependency("node",u):null,d=new w;h==null||h.getWorldPosition(d),d.y<.001&&console.warn("VRMAnimationLoaderPlugin: The loaded VRM Animation might violate the VRM T-pose (The y component of the rest hips position is approximately zero or below.)");let p=i.animations.map((_,g)=>{let m=r.animations[g],y=this._parseAnimation(_,m,l,c);return y.restHipsPosition=d,y});i.userData.vrmAnimations=p})}_createNodeMap(i){var e,t,n,r,s;let o=new Map,a=new Map,l=(e=i.humanoid)==null?void 0:e.humanBones;l&&Object.entries(l).forEach(([d,f])=>{let p=f==null?void 0:f.node;p!=null&&o.set(p,d)});let c=(t=i.expressions)==null?void 0:t.preset;c&&Object.entries(c).forEach(([d,f])=>{let p=f==null?void 0:f.node;p!=null&&a.set(p,d)});let u=(n=i.expressions)==null?void 0:n.custom;u&&Object.entries(u).forEach(([d,f])=>{let{node:p}=f;a.set(p,d)});let h=(s=(r=i.lookAt)==null?void 0:r.node)!=null?s:null;return{humanoidIndexToName:o,expressionsIndexToName:a,lookAtIndex:h}}_createBoneWorldMatrixMap(i,e){return Rp(this,null,function*(){var t,n;i.scene.updateWorldMatrix(!1,!0);let r=yield i.parser.getDependencies("node"),s=new Map;if(e.humanoid==null)return s;for(let[o,a]of Object.entries(e.humanoid.humanBones)){let l=a==null?void 0:a.node;if(l!=null){let c=r[l];s.set(o,c.matrixWorld),o==="hips"&&s.set("hipsParent",(n=(t=c.parent)==null?void 0:t.matrixWorld)!=null?n:$E)}}return s})}_parseAnimation(i,e,t,n){let r=i.tracks,s=e.channels,o=new ZE;return o.duration=i.duration,s.forEach((a,l)=>{let{node:c,path:u}=a.target,h=r[l];if(c==null)return;let d=t.humanoidIndexToName.get(c);if(d!=null){let p=Op[d];for(;p!=null&&n.get(p)==null;)p=Op[p];if(p==null&&(p="hipsParent"),u==="translation")if(d!=="hips")console.warn(`The loading animation contains a translation track for ${d}, which is not permitted in the VRMC_vrm_animation spec. ignoring the track`);else{let _=n.get("hipsParent"),g=Gp(h.values,3).flatMap(y=>oo.fromArray(y).applyMatrix4(_).toArray()),m=h.clone();m.values=new Float32Array(g),o.humanoidTracks.translation.set(d,m)}else if(u==="rotation"){let _=n.get(d),g=n.get(p);_.decompose(oo,Qu,oo),Qu.invert(),g.decompose(oo,Wp,oo);let m=Gp(h.values,4).flatMap(S=>jE.fromArray(S).premultiply(Wp).multiply(Qu).toArray()),y=h.clone();y.values=new Float32Array(m),o.humanoidTracks.rotation.set(d,y)}else throw new Error(`Invalid path "${u}"`);return}let f=t.expressionsIndexToName.get(c);if(f!=null){if(u==="translation"){let p=h.times,_=new Float32Array(h.values.length/3);for(let m=0;m<_.length;m++)_[m]=h.values[3*m];let g=new hn(`${f}.weight`,p,_);JE.has(f)?o.expressionTracks.preset.set(f,g):o.expressionTracks.custom.set(f,g)}else throw new Error(`Invalid path "${u}"`);return}if(c===t.lookAtIndex)if(u==="rotation")o.lookAtTrack=h;else throw new Error(`Invalid path "${u}"`)}),o}};var nm={leftUpperArm:{z:-1.15},rightUpperArm:{z:1.15},leftLowerArm:{y:-.07},rightLowerArm:{y:.07},leftShoulder:{z:-.06},rightShoulder:{z:.06}};function im(i){let e=i==null?void 0:i.humanoid,t={};if(!e)return t;for(let n of Object.keys(nm)){let r=e.getNormalizedBoneNode(n);r&&(t[n]={x:r.rotation.x,y:r.rotation.y,z:r.rotation.z})}return t}function ao(i,e=1,t={}){var s,o,a,l;let n=i==null?void 0:i.humanoid;if(!n)return;let r=Math.max(0,Math.min(1,e));for(let[c,u]of Object.entries(nm)){let h=n.getNormalizedBoneNode(c);if(!h)continue;let d=(s=t[c])!=null?s:{x:0,y:0,z:0};h.rotation.x=d.x+((o=u.x)!=null?o:0)*r,h.rotation.y=d.y+((a=u.y)!=null?a:0)*r,h.rotation.z=d.z+((l=u.z)!=null?l:0)*r}}function rm({targetFps:i=30,steps:e=[1,.85,.72,.6,.5]}={}){let t=0,n=0,r=0,s=0,o=0,a="none",l=()=>1e3/Math.max(5,i);return{get scale(){return e[t]},get level(){return t===0?"high":t<=2?"medium":"low"},get index(){return t},get lastChange(){return a},setTargetFps(c){Number(c)>0&&(i=Number(c))},reset(){t=0,n=0,r=0,s=0,o=0,a="none"},sample(c){if(!Number.isFinite(c)||c<=0)return{scale:e[t],changed:0};if(n+=c,r+=1,r<30)return{scale:e[t],changed:0};let u=n/r;n=0,r=0;let h=l(),d=0;return u>h*.92?(s+=1,o=0,s>=2&&t<e.length-1&&(t+=1,d=-1,s=0,a="turun")):u<h*.55?(o+=1,s=0,o>=4&&t>0&&(t-=1,d=1,o=0,a="naik")):(s=0,o=0),{scale:e[t],changed:d,avgWorkMs:u,level:this.level}}}}var QE=["map","normalMap","emissiveMap","aoMap","alphaMap","roughnessMap","metalnessMap","matcapTexture","shadeMultiplyTexture","outlineWidthTexture","rimMultiplyTexture","uvAnimationMaskTexture"];function sm(i,e){let t={resized:0,skipped:0,maxSize:e};if(!i||!e)return t;let n=new Set;return i.traverse(r=>{let s=r.material?Array.isArray(r.material)?r.material:[r.material]:[];for(let o of s)for(let a of QE){let l=o==null?void 0:o[a];if(!l||!l.isTexture||n.has(l.uuid))continue;n.add(l.uuid);let c=l.image,u=(c==null?void 0:c.width)||(c==null?void 0:c.videoWidth)||0,h=(c==null?void 0:c.height)||(c==null?void 0:c.videoHeight)||0;if(!u||!h){t.skipped+=1;continue}let d=Math.max(u,h);if(d<=e){t.skipped+=1;continue}let f=e/d,p=document.createElement("canvas");p.width=Math.max(1,Math.round(u*f)),p.height=Math.max(1,Math.round(h*f));let _=p.getContext("2d");if(!_){t.skipped+=1;continue}try{_.drawImage(c,0,0,p.width,p.height)}catch(g){t.skipped+=1;continue}l.image=p,l.needsUpdate=!0,t.resized+=1}}),t}function th(i,e){var u,h,d,f,p,_,g,m,y,S,v;let t=i==null?void 0:i.info,n=(h=(u=t==null?void 0:t.render)==null?void 0:u.triangles)!=null?h:0,r=(f=(d=t==null?void 0:t.render)==null?void 0:d.calls)!=null?f:0,s=(_=(p=t==null?void 0:t.memory)==null?void 0:p.textures)!=null?_:0,o=(m=(g=t==null?void 0:t.memory)==null?void 0:g.geometries)!=null?m:0,a=0,l=0;(y=e==null?void 0:e.scene)==null||y.traverse(A=>{A.isSkinnedMesh&&A.skeleton&&(l+=1,a=Math.max(a,A.skeleton.bones.length))});let c=0;return(v=(S=e==null?void 0:e.springBoneManager)==null?void 0:S.joints)==null||v.forEach(()=>{c+=1}),{triangles:n,calls:r,textures:s,geometries:o,bones:a,meshes:l,springJoints:c}}var om=Math.PI/180,eS={hips:{x:12,y:25,z:12},spine:{x:14,y:18,z:14},chest:{x:14,y:20,z:14},neck:{x:25,y:35,z:20},head:{x:28,y:45,z:25},leftShoulder:{x:20,y:20,z:20},rightShoulder:{x:20,y:20,z:20},leftUpperArm:{x:60,y:55,z:60},rightUpperArm:{x:60,y:55,z:60},leftLowerArm:{x:60,y:20,z:25},rightLowerArm:{x:60,y:20,z:25},leftUpperLeg:{x:45,y:25,z:25},rightUpperLeg:{x:45,y:25,z:25},leftLowerLeg:{x:50,y:12,z:12},rightLowerLeg:{x:50,y:12,z:12}};var tS={x:30,y:30,z:30};function am(i,e){var r,s,o,a;let t=(r=eS[i])!=null?r:tS,n=(l,c)=>{let u=c*om;return Math.min(u,Math.max(-u,l))};return{x:n((s=e.x)!=null?s:0,t.x),y:n((o=e.y)!=null?o:0,t.y),z:n((a=e.z)!=null?a:0,t.z)}}function vl(i,e,t,n){if(t<=0)return e;let r=1-Math.pow(.5,Math.max(0,n)/t);return i+(e-i)*Math.min(1,Math.max(0,r))}function lm(i,e){let t=8*om,n=o=>Math.max(-1,Math.min(1,o/2400)),r=n(i!=null?i:0),s=n(e!=null?e:0);return{spineZ:-r*t,headZ:r*t*.45,spineX:s*t*.5}}var cm=new gt,um=new Q,QA=Math.PI/180,nS=["hips","spine","chest","neck","head","leftShoulder","rightShoulder","leftUpperArm","rightUpperArm","leftLowerArm","rightLowerArm","leftUpperLeg","rightUpperLeg","leftLowerLeg","rightLowerLeg"],iS=["idle","walk","dance"];function Hn(i,e,t){return Math.min(t,Math.max(e,i))}function nh(i){let e=Math.sin(i*12.9898)*43758.5453;return e-Math.floor(e)}function hm(i={}){let e={time:0,locomotion:"idle",reducedMotion:!!i.reducedMotion,idleSeconds:0,sleepiness:0,blinkSpeed:1,look:{yaw:0,pitch:0,targetYaw:0,targetPitch:0,nextAt:2.5,seed:1},react:{type:null,at:0,duration:0},danceVariant:0,lastExpressionChange:0,drag:{vx:0,vy:0,lean:0},reactionStyle:null},t=new Map,n=new Map;function r(l){if(!(l!=null&&l.humanoid))return!1;if(n.size>0)return!0;for(let c of nS){let u=l.humanoid.getNormalizedBoneNode(c);u&&n.set(c,u)}return n.size>0}function s(){t.clear()}function o(){for(let[l,c]of n){let u=t.get(l);u&&c.quaternion.copy(u)}}function a(l,c,u={}){if(!r(l))return;let h=!!u.talking,d=Hn(c,0,.1);e.time+=d,u.interacted?(e.idleSeconds=0,e.sleepiness=0):e.idleSeconds+=d;let f=e.locomotion==="idle"&&e.idleSeconds>120?1:0;e.sleepiness+=(f-e.sleepiness)*Hn(d*(f>e.sleepiness?.35:1.2),0,1),e.blinkSpeed=1-e.sleepiness*.6;let p={hips:{x:0,y:0,z:0},spine:{x:0,y:0,z:0},chest:{x:0,y:0,z:0},neck:{x:0,y:0,z:0},head:{x:0,y:0,z:0},leftShoulder:{x:0,y:0,z:0},rightShoulder:{x:0,y:0,z:0},leftUpperArm:{x:0,y:0,z:0},rightUpperArm:{x:0,y:0,z:0},leftLowerArm:{x:0,y:0,z:0},rightLowerArm:{x:0,y:0,z:0},leftUpperLeg:{x:0,y:0,z:0},rightUpperLeg:{x:0,y:0,z:0},leftLowerLeg:{x:0,y:0,z:0},rightLowerLeg:{x:0,y:0,z:0}},_=e.time,g=e.reducedMotion?.35:1,m=1-e.sleepiness*.65,y=Math.sin(_*2*Math.PI*.35);p.chest.x+=.019*y*m,p.spine.x+=.038*y*m,p.leftShoulder.z+=.014*y,p.rightShoulder.z-=.014*y;let S=Math.sin(_*2*Math.PI*.3);p.hips.z+=.05*S*g*m,p.hips.x+=.01*Math.sin(_*1.1),p.spine.z-=.075*S*m,p.chest.z-=.02*S,p.leftUpperLeg.z+=.02*S,p.rightUpperLeg.z-=.02*S;let v=Math.sin(_*2*Math.PI*.3+1.1);if(p.leftUpperArm.z+=.02*v*m,p.rightUpperArm.z-=.02*Math.sin(_*2*Math.PI*.3)*m,p.leftLowerArm.x+=.02+.012*Math.sin(_*1.1),p.rightLowerArm.x+=.02+.012*Math.sin(_*1.25),_>e.look.nextAt&&(e.look.seed+=1,e.look.targetYaw=(nh(e.look.seed*3.1)-.5)*.15,e.look.targetPitch=(nh(e.look.seed*7.7)-.5)*.14,e.look.nextAt=_+4+nh(e.look.seed)*5),e.look.yaw+=(e.look.targetYaw-e.look.yaw)*Hn(d*2.2,0,1),e.look.pitch+=(e.look.targetPitch-e.look.pitch)*Hn(d*2.2,0,1),p.neck.y+=e.look.yaw*.5,p.head.y+=e.look.yaw*.5,p.neck.x+=e.look.pitch*.45,p.head.x+=e.look.pitch*.4,h&&(p.head.x+=.02*Math.sin(_*6.2),p.neck.y+=.015*Math.sin(_*4.1)),e.sleepiness>.02){let M=e.sleepiness;p.head.x+=.26*M,p.neck.x+=.1*M,p.head.z+=.09*M*Math.sin(_*.25),p.leftUpperArm.z+=.1*M,p.rightUpperArm.z-=.1*M,p.spine.x+=.05*M}if(e.locomotion==="walk"){let T=Math.sin(_*2*Math.PI*.7),C=Math.sin(_*2*Math.PI*.7+Math.PI);p.leftUpperLeg.x+=.55*T,p.rightUpperLeg.x+=.55*C,p.leftLowerLeg.x+=.34*Math.max(0,-T),p.rightLowerLeg.x+=.34*Math.max(0,-C),p.leftUpperArm.x+=.18*C,p.rightUpperArm.x+=.18*T,p.spine.z+=.09*Math.sin(_*2*Math.PI*.7*2),p.hips.z+=.04*Math.sin(_*2*Math.PI*.7*2),p.spine.x+=.03}else if(e.locomotion==="dance"){let M=_*2*Math.PI*2.25,T=e.danceVariant%3;if(T===0)p.hips.z+=.12*Math.sin(M*.5),p.spine.z-=.11*Math.sin(M*.5),p.leftUpperArm.z+=.42+.26*Math.sin(M),p.rightUpperArm.z-=.42+.26*Math.sin(M+Math.PI),p.chest.x+=.1*Math.sin(M*.5+1),p.head.z+=.12*Math.sin(M*.5),p.head.y+=.14*Math.sin(M*.5),p.leftUpperLeg.x+=.12*Math.sin(M*.5),p.rightUpperLeg.x-=.12*Math.sin(M*.5);else if(T===1)p.spine.x+=.3+.14*Math.sin(M*.5),p.chest.x+=.2*Math.sin(M*.5+1),p.leftUpperArm.x+=.6+.16*Math.sin(M*.5),p.rightUpperArm.x+=.6+.16*Math.sin(M*.5+Math.PI),p.head.x+=.12*Math.sin(M*.5);else{let C=Math.sin(M*.25);p.hips.y+=.32*C,p.spine.y-=.12*C,p.leftUpperArm.z+=.6,p.rightUpperArm.z-=.6,p.head.y+=.2*C,p.chest.x+=.12*Math.sin(M*.5)}}if(e.react.type){let M=(_-e.react.at)*1e3;if(M>e.react.duration)e.react.type=null;else{let T=M/e.react.duration,C=Math.sin(T*Math.PI);e.react.type==="head"?(p.head.x-=.18*C,p.chest.x-=.05*C):e.react.type==="body"?(p.spine.z+=.1*C,p.head.z+=.12*C):(p.hips.x-=.06*C,p.leftUpperArm.z+=.2*C,p.rightUpperArm.z-=.2*C)}}e.drag.lean=vl(e.drag.lean,0,260,d*1e3);let A=e.drag.vx,R=e.drag.vy;e.drag.vx=vl(e.drag.vx,0,220,d*1e3),e.drag.vy=vl(e.drag.vy,0,220,d*1e3);let I=lm(A,R);p.spine.z+=I.spineZ,p.head.z+=I.headZ,p.spine.x+=I.spineX,p.hips.z+=I.spineZ*.3;let L=u.reaction;if(L&&L.layers){for(let[M,T]of Object.entries(L.layers)){let C=p[M];!C||!T||(C.x+=Hn(T.x||0,-1,1),C.y+=Hn(T.y||0,-1,1),C.z+=Hn(T.z||0,-1,1))}e.reactionStyle=L.styleId||null}else e.reactionStyle=null;if(e.locomotion!=="dance"){let M=e.reactionStyle?1.1:.35;for(let T of["leftUpperArm","rightUpperArm","leftLowerArm","rightLowerArm"])p[T].x=Hn(p[T].x,-M,M),p[T].y=Hn(p[T].y,-M,M),p[T].z=Hn(p[T].z,-M,M)}for(let[M,T]of n){t.has(M)?t.get(M).copy(T.quaternion):t.set(M,T.quaternion.clone());let C=p[M];if(!C)continue;let H=M==="hips"||M==="spine"||M==="chest"||M==="head"||M==="neck"||M.endsWith("Shoulder")||M.endsWith("UpperArm")||M.endsWith("LowerArm")||M.endsWith("Leg")?am(M,C):C;!H.x&&!H.y&&!H.z||(cm.set(H.x,H.y,H.z,"XYZ"),um.setFromEuler(cm),T.quaternion.multiply(um))}}return{state:e,resetToBase:o,clearBase:s,update:a,setLocomotion(l){return e.locomotion=iS.includes(l)?l:"idle",e.locomotion!=="idle"&&(e.idleSeconds=0,e.sleepiness=0),e.locomotion},nextDance(){return e.danceVariant=(e.danceVariant+1)%3,e.locomotion="dance",e.danceVariant},setReducedMotion(l){e.reducedMotion=!!l},setDrag(l,c){e.drag.vx=Math.max(-4e3,Math.min(4e3,Number(l)||0)),e.drag.vy=Math.max(-4e3,Math.min(4e3,Number(c)||0))},react(l){e.react={type:l,at:e.time,duration:800},e.idleSeconds=0,e.sleepiness=0,e.look.targetYaw=l==="head"?.18:.05,e.look.targetPitch=l==="head"?-.18:.02},debug(){return{time:Number(e.time.toFixed(2)),locomotion:e.locomotion,sleepiness:Number(e.sleepiness.toFixed(2)),lookYaw:Number(e.look.yaw.toFixed(3)),bones:n.size,react:e.react.type,reactionStyle:e.reactionStyle,sway:Number((Math.abs(e.drag.vx)+Math.abs(e.drag.vy)).toFixed(1))}}}}var rS=["ceria","kalem","pemalu"],sS=["idle_torch","spell_idle","crouch_idle","interact","dance_loop","walk_formal","jog_loop","jump_loop","push_loop","kneel_fix","crouch_walk","drive_idle","sprint_loop","swim_idle","swim_fwd"],dm=[{id:"random_clip",clips:sS,minMs:2200,maxMs:4200,gapMin:1200,gapMax:3200,weight:9,cooldownMs:3e3,moods:{ceria:1.3,kalem:1,pemalu:.9}},{id:"look_around",clip:"idle_loop",minMs:2400,maxMs:4200,gapMin:2200,gapMax:6500,weight:3,cooldownMs:9e3,moods:{ceria:1.2,kalem:1.4,pemalu:.8}},{id:"weight_shift",clip:"idle_loop",minMs:3e3,maxMs:5200,gapMin:2600,gapMax:7e3,weight:3,cooldownMs:11e3,moods:{ceria:1,kalem:1.3,pemalu:.9}},{id:"stretch",clip:"idle_torch",minMs:2500,maxMs:2500,gapMin:3500,gapMax:8e3,weight:2,cooldownMs:45e3,moods:{ceria:1,kalem:1.2,pemalu:.6},requires:i=>i.idleMs>=4e4},{id:"wave_hello",clip:"interact",minMs:2e3,maxMs:2e3,gapMin:3e3,gapMax:7e3,weight:2,cooldownMs:9e4,moods:{ceria:3,kalem:.8,pemalu:.4},requires:i=>i.idleMs>=25e3},{id:"talk_self",clip:"idle_talk",minMs:2900,maxMs:2900,gapMin:4e3,gapMax:9e3,weight:1,cooldownMs:12e4,moods:{ceria:1.6,kalem:.5,pemalu:.8},requires:i=>i.idleMs>=6e4},{id:"pose_cute",clip:"spell_idle",minMs:2080,maxMs:2080,gapMin:5e3,gapMax:12e3,weight:1,cooldownMs:15e4,moods:{ceria:2.2,kalem:.4,pemalu:1.4},requires:i=>i.idleMs>=45e3},{id:"spell_practice",clip:"spell_shoot",once:!0,minMs:900,maxMs:1400,gapMin:3e3,gapMax:8e3,weight:1.6,cooldownMs:15e3,moods:{ceria:1.4,kalem:.8,pemalu:.6}},{id:"pick_up",clip:"pickup",once:!0,minMs:1100,maxMs:1600,gapMin:3e3,gapMax:9e3,weight:1.2,cooldownMs:18e3,moods:{ceria:1,kalem:1.2,pemalu:1}},{id:"roll_play",clip:"roll",once:!0,minMs:1500,maxMs:2e3,gapMin:4e3,gapMax:12e3,weight:.8,cooldownMs:25e3,moods:{ceria:1.6,kalem:.4,pemalu:.5}},{id:"sit_down",clip:"sitting_enter",minMs:1290,maxMs:1290,gapMin:0,gapMax:0,weight:1,cooldownMs:6e4,moods:{ceria:1,kalem:1.6,pemalu:.8},requires:i=>i.idleMs>=3e4&&i.edgeSeatAvailable===!0},{id:"sleep",clip:"crouch_idle",minMs:6e3,maxMs:6e3,gapMin:0,gapMax:0,weight:1,cooldownMs:18e4,moods:{ceria:.6,kalem:2,pemalu:1},requires:i=>i.idleMs>=12e4}],oS=["look_around","weight_shift"];function fm(i={}){var h;let e=typeof i.random=="function"?i.random:n((h=i.seed)!=null?h:20260101),t={mood:"ceria",active:null,activeUntil:0,nextAt:0,lastClip:null,lastSeen:new Map,history:[],moodChangedAt:0,reducedMotion:!!i.reducedMotion,lastInteractionAt:-1/0};function n(d){let f=d>>>0;return()=>{f=f+1831565813>>>0;let p=Math.imul(f^f>>>15,1|f);return p=p+Math.imul(p^p>>>7,61|p)^p,((p^p>>>14)>>>0)/4294967296}}function r(d,f){return f-t.lastInteractionAt<6e4?"ceria":d.idleMs>=9e4?"kalem":d.armed&&d.idleMs>=2e4?"pemalu":"ceria"}function s(d,f){var _,g;let p=(g=(_=d.moods)==null?void 0:_[f])!=null?g:1;return d.weight*p}function o(d,f){var g,m;let p=[];for(let y of dm){if(y.requires&&!y.requires(d))continue;let S=(g=t.lastSeen.get(y.id))!=null?g:-1/0;if(f-S<y.cooldownMs)continue;let v=s(y,t.mood);v<=0||p.push({behavior:y,weight:v})}let _=(m=t.history[t.history.length-1])==null?void 0:m.id;if(_&&p.length>1){let y=p.filter(S=>S.behavior.id!==_);if(y.length>0)return y}return p}function a(d){let f=d.reduce((_,g)=>_+g.weight,0);if(f<=0)return null;let p=e()*f;for(let _ of d)if(p-=_.weight,p<=0)return _.behavior;return d[d.length-1].behavior}function l(d,f){let p=d;if(Array.isArray(d.clips)&&d.clips.length>0){let y=d.clips.filter(A=>A!==t.lastClip),S=y.length>0?y:d.clips,v=S[Math.floor(e()*S.length)];t.lastClip=v,p={...d,clip:v}}d=p;let _=d.maxMs-d.minMs,g=d.minMs+Math.round(e()*Math.max(0,_));t.active=d,t.activeUntil=f+g,t.lastSeen.set(d.id,f);let m=d.gapMin+e()*Math.max(0,d.gapMax-d.gapMin);return t.nextAt=t.activeUntil+m,t.history.push({id:d.id,clip:d.clip,at:Math.round(f),durationMs:g}),t.history.length>60&&t.history.shift(),d}function c(d){let f=t.active;if(t.active=null,!f)return;let p=f.gapMin+e()*Math.max(0,f.gapMax-f.gapMin);t.nextAt=d+p}function u(d,f={}){var _;if(f.interacted&&(t.lastInteractionAt=d),t.active&&(f.talking||f.locomotion!=="idle")&&c(d),f.talking||f.locomotion!=="idle")return t.active=null,t.nextAt<d&&(t.nextAt=d+1500),null;if(t.active){if(d<t.activeUntil)return t.active;c(d)}if(t.mood=r(f,d),d<t.nextAt)return null;if(t.reducedMotion){let g=dm.find(m=>oS.includes(m.id));return g&&d-((_=t.lastSeen.get(g.id))!=null?_:-1/0)>=g.cooldownMs?l(g,d):(t.nextAt=d+2e4,null)}let p=a(o(f,d));return p?l(p,d):(t.nextAt=d+4e3,null)}return{state:t,update:u,currentClip:()=>{var d,f;return(f=(d=t.active)==null?void 0:d.clip)!=null?f:null},currentId:()=>{var d,f;return(f=(d=t.active)==null?void 0:d.id)!=null?f:null},timeline:()=>t.history.slice(),setMood:d=>{rS.includes(d)&&(t.mood=d)},setReducedMotion:d=>{t.reducedMotion=!!d},reset:(d=0)=>{t.active=null,t.activeUntil=0,t.nextAt=d+2500,t.lastSeen.clear(),t.history.length=0}}}var ih=[{id:"head",bones:["head"],radius:.085,bonus:1},{id:"cheek",bones:["head"],radius:.055,bonus:1.15},{id:"shoulder",bones:["leftShoulder","rightShoulder"],radius:.07,bonus:1},{id:"hand",bones:["leftHand","rightHand"],radius:.075,bonus:1},{id:"belly",bones:["spine"],radius:.075,bonus:1},{id:"hip",bones:["hips"],radius:.055,bonus:1.15},{id:"leg",bones:["leftLowerLeg","rightLowerLeg"],radius:.07,bonus:1}],pm=["head","leftFoot","rightFoot","leftHand","rightHand","leftLowerLeg","rightLowerLeg","hips","spine"],yl=new w,Ml=new w,nR=new w,iR=new w;function mm(i,e){var n,r;let t=i==null?void 0:i.humanoid;return t&&(((n=t.getNormalizedBoneNode)==null?void 0:n.call(t,e))||((r=t.getRawBoneNode)==null?void 0:r.call(t,e)))||null}function sr(i,e,t){let n=mm(i,e);return n?(n.updateWorldMatrix(!0,!1),n.getWorldPosition(t)):null}function gm(i){let e=-1/0,t=1/0,n=0;for(let a of pm){let l=sr(i,a,yl);l&&(n+=1,e=Math.max(e,l.y),t=Math.min(t,l.y))}let r=e-t;if(n>=2&&Number.isFinite(r)&&r>.25)return r;let s=sr(i,"leftShoulder",yl),o=sr(i,"rightShoulder",Ml);if(s&&o){let a=s.distanceTo(o);if(a>.05)return a*3.2}return 1.5}function _m(i,e){return e?e.startsWith("left")?"left":e.startsWith("right")?"right":null:null}function xm(i,e){var o,a;let t=gm(i),n=null;for(let l of ih)for(let c of l.bones){let u=sr(i,c,Ml);if(!u)continue;let h=u.distanceTo(e),d=l.radius*t,f=h/l.bonus;(!n||f<n.score)&&(n={zone:l.id,bone:c,distance:h,score:f,radiusWorld:d,def:l})}if(!n)return{zone:"belly",bone:"spine",distance:1/0,side:null,inside:!1};let r=n.zone;if(r==="head"||r==="cheek"){let l=aS(i,e,t);l&&(r=l)}let s=((a=(o=ih.find(l=>l.id===r))==null?void 0:o.radius)!=null?a:.06)*t;return{zone:r,bone:n.bone,distance:n.distance,side:_m(i,n.bone),inside:n.distance<=s*1.55,radiusWorld:s}}function aS(i,e,t){let n=mm(i,"head");if(!n)return null;n.updateWorldMatrix(!0,!1);let r=n.getWorldPosition(yl).clone(),s=.085*t;n.getWorldQuaternion(new Q).normalize();let o=e.clone().sub(r).applyQuaternion(n.getWorldQuaternion(new Q).invert()),a=o.y/s,l=o.x/s,c=o.z/s;return a>.42?"head":Math.abs(l)>.3&&c>-.2&&a>-.35?"cheek":"head"}function vm(i,e,t,n){if(!e)return{zone:"belly",bone:"spine",distance:1/0,side:null,inside:!1};let r=gm(i),s=Math.max(1,(n==null?void 0:n.width)||1),o=Math.max(1,(n==null?void 0:n.height)||1),a=null,l=new w;for(let c of ih)for(let u of c.bones){let h=sr(i,u,Ml);if(!h)continue;l.copy(h).project(e);let d=(l.x-t.x)*s/2,f=(l.y-t.y)*o/2,p=Math.hypot(d,f),_=c.radius*r*o/Math.max(.2,lS(i)),g=p/Math.max(1,_)/c.bonus;(!a||g<a.score)&&(a={zone:c.id,bone:u,distance:p,score:g,inside:p<=_*1.6,side:_m(i,u)})}if(!a)return{zone:"belly",bone:"spine",distance:1/0,side:null,inside:!1};if(a.zone==="head"){let c=sr(i,"head",Ml);if(c){l.copy(c).project(e);let u=(l.y-t.y)*o/2;a.zone=u>0?"head":Math.abs((l.x-t.x)*s/2)>12?"cheek":"head"}}return a}function lS(i){let e=-1/0,t=1/0;for(let r of pm){let s=sr(i,r,yl);s&&(e=Math.max(e,s.y),t=Math.min(t,s.y))}let n=e-t;return Number.isFinite(n)&&n>.05?n:1.5}function ym(i={}){var c,u,h,d,f,p;let e=(c=i.strokeDistance)!=null?c:60,t=(u=i.strokeWindow)!=null?u:900,n=(h=i.doubleWindow)!=null?h:400,r=(d=i.rapidWindow)!=null?d:1e3,s=(f=i.holdMs)!=null?f:900,o=(p=i.relaxMs)!=null?p:1400,a={down:null,strokes:0,taps:{zone:null,count:0,lastAt:0},lastEvent:null,events:0};function l(){a.down=null,a.strokes=0}return{state:a,down(_,g,m,y){a.down={zone:_,x0:g,y0:m,x:g,y:m,t0:y,path:0,stroke:!1}},move(_,g,m){let y=a.down;return y?(y.path+=Math.hypot(_-y.x,g-y.y),y.x=_,y.y=g,(y.zone==="head"||y.zone==="cheek")&&!y.stroke&&y.path>=e&&m-y.t0<=t?(y.stroke=!0,a.strokes+=1,a.lastEvent={type:"stroke",zone:"head",at:m},a.lastEvent):null):null},up(_){let g=a.down;if(a.down=null,!g)return null;let m=_-g.t0;if(g.path>=Math.max(e,24))return g.stroke,null;if(m>=s)return a.lastEvent={type:"hold",zone:g.zone,at:_,duration:m},a.lastEvent;let y=a.taps,v=y.zone===g.zone&&_-y.lastAt<=(y.count>=2?r:n);y.zone=g.zone,y.lastAt=_,y.count=v?y.count+1:1;let A="tap";return y.count===2&&(A="double"),y.count>=3&&(A="rapid",y.count=0),a.lastEvent={type:A,zone:g.zone,at:_,count:y.count,duration:m},a.lastEvent},markStroke(_){return a.strokes+=1,a.lastEvent={type:"stroke",zone:"head",at:_},a.lastEvent},tick(_){a.taps.zone&&_-a.taps.lastAt>o&&(a.taps.zone=null,a.taps.count=0)},get strokes(){return a.strokes},consumeStrokes(){let _=a.strokes;return a.strokes=0,_}}}var cS=[{id:"malas",label:"Malas",priority:1,duration:2800,cooldown:12e3,shape:"plateau",eyes:"half",expr:{relaxed:.5},pose:{hips:[0,0,.09],spine:[.02,0,-.06],head:[.05,.06,.1],leftShoulder:[0,0,-.05],rightShoulder:[0,0,.05],leftUpperArm:[0,0,.05],rightUpperArm:[0,0,-.05]},sfx:"sigh"},{id:"ngantuk",label:"Ngantuk",priority:1,duration:4e3,cooldown:2e4,shape:"plateau",eyes:"slow",expr:{relaxed:.7},pose:{head:[.2,0,.05],neck:[.1,0,0],spine:[.05,0,0],leftUpperArm:[0,0,.06],rightUpperArm:[0,0,-.06]},wave:[{bone:"head",axis:"x",amplitude:.05,hz:.25}],sfx:"yawn"},{id:"tidur",label:"Tidur-tiduran",priority:2,duration:12e4,cooldown:6e4,shape:"plateau",ramp:.18,eyes:"closed",expr:{relaxed:.3},pose:{head:[.26,.1,.12],neck:[.12,0,.05],spine:[.1,0,0],chest:[.04,0,0],leftUpperArm:[0,0,.12],rightUpperArm:[0,0,-.12]},wave:[{bone:"chest",axis:"x",amplitude:.012,hz:.18}],clip:"sitting_idle",clipStart:"sitting_enter",interruptible:!0,sfx:null},{id:"boring",label:"Boring",priority:1,duration:5e3,cooldown:25e3,shape:"plateau",eyes:"half",expr:{neutral:.6},pose:{head:[.07,.2,.07],chest:[0,0,.04],leftUpperArm:[0,0,.04],rightUpperArm:[0,0,-.04]},wave:[{bone:"leftLowerLeg",axis:"x",amplitude:.12,hz:.8}],sfx:"tongue_click"},{id:"marah",label:"Marah",priority:2,duration:2500,cooldown:12e3,shape:"pulse",eyes:"angry",expr:{angry:.95},pose:{head:[-.08,0,0],chest:[-.05,0,0],spine:[-.05,0,0],leftUpperArm:[.1,0,.16],rightUpperArm:[.1,0,-.16],leftLowerArm:[.35,0,0],rightLowerArm:[.35,0,0]},wave:[{bone:"hips",axis:"y",amplitude:.035,hz:3}],sfx:"huff_hard",sfxFollow:{name:"hmph",at:.45}},{id:"ngambek",label:"Ngambek",priority:2,duration:6e3,cooldown:15e3,shape:"plateau",eyes:"half",expr:{sad:.85},pose:{head:[.12,-.3,.05],chest:[.02,-.06,0],leftUpperArm:[.35,0,.5],rightUpperArm:[.35,0,-.5],leftLowerArm:[.5,0,0],rightLowerArm:[.5,0,0]},yaw:-.4,sfx:"sigh_low",rejectTouchMs:5e3},{id:"sayang",label:"Sayang",priority:2,duration:2200,cooldown:6e3,shape:"pulse",eyes:"closed",expr:{happy:.95},pose:{head:[.06,0,.16],chest:[.03,0,0],leftUpperArm:[.25,0,.2],rightUpperArm:[.25,0,-.2],leftLowerArm:[.6,0,0],rightLowerArm:[.6,0,0]},wave:[{bone:"head",axis:"z",amplitude:.03,hz:.6}],sfx:"hum_soft"},{id:"peluk",label:"Peluk",priority:2,duration:2e3,cooldown:2e4,shape:"pulse",eyes:"closed",expr:{happy:.8},clip:"interact",pose:{spine:[.08,0,0],head:[.1,0,0],leftUpperArm:[.9,0,.35],rightUpperArm:[.9,0,-.35],leftLowerArm:[.5,0,0],rightLowerArm:[.5,0,0]},nudge:[0,-8],sfx:"mmm"},{id:"malu",label:"Malu (>_<)",priority:3,duration:2600,cooldown:5e3,shape:"pulse",eyes:"squint",expr:{happy:.45,sad:.3,angry:.12},pose:{head:[.18,0,0],spine:[.12,0,0],chest:[.06,0,0],leftUpperArm:[.5,0,.55],rightUpperArm:[.5,0,-.55],leftLowerArm:[1,0,0],rightLowerArm:[1,0,0],leftUpperLeg:[0,0,.05],rightUpperLeg:[0,0,-.05]},nudge:[0,10],sfx:"eep"},{id:"kaget",label:"Kaget",priority:2,duration:1400,cooldown:4e3,shape:"pulse",eyes:"wide",expr:{surprised:1},clip:"jump_start",pose:{head:[-.16,0,0],neck:[-.08,0,0],spine:[-.12,0,0],leftShoulder:[0,0,.25],rightShoulder:[0,0,-.25],leftUpperArm:[.3,0,.2],rightUpperArm:[.3,0,-.2]},nudge:[0,6],sfx:"gasp"},{id:"ketawa",label:"Ketawa",priority:2,duration:2400,cooldown:8e3,shape:"pulse",eyes:"squint",expr:{happy:1},pose:{head:[.12,0,.06],chest:[.1,0,0],spine:[.14,0,0],leftLowerArm:[.55,0,0],rightLowerArm:[.55,0,0]},wave:[{bone:"hips",axis:"x",amplitude:.04,hz:1.8},{bone:"head",axis:"z",amplitude:.05,hz:1.8}],sfx:"giggle_3"},{id:"geli",label:"Geli",priority:2,duration:1800,cooldown:6e3,shape:"pulse",eyes:"squint",expr:{happy:.7,surprised:.3},pose:{head:[.05,0,.08],leftUpperArm:[.3,0,.5],rightUpperArm:[.3,0,-.5],leftLowerArm:[.3,0,0],rightLowerArm:[.3,0,0]},wave:[{bone:"spine",axis:"y",amplitude:.22,hz:2.6},{bone:"head",axis:"y",amplitude:.18,hz:2.6}],nudge:[0,6],sfx:"giggle_short"},{id:"bangga",label:"Bangga",priority:2,duration:2200,cooldown:15e3,shape:"pulse",eyes:"normal",expr:{happy:.8},clip:"spell_enter",pose:{chest:[-.1,0,0],head:[-.08,0,0],leftUpperArm:[.35,0,.55],rightUpperArm:[.35,0,-.55],leftLowerArm:[.9,0,0],rightLowerArm:[.9,0,0]},sfx:"chime_up"},{id:"lompat",label:"Lompat gembira",priority:1,duration:1800,cooldown:3e4,shape:"pulse",eyes:"normal",expr:{happy:1},clips:["jump_start","jump_land"],pose:{spine:[.05,0,0],head:[-.05,0,0],leftUpperArm:[0,0,.4],rightUpperArm:[0,0,-.4]},sfx:"boing"},{id:"lambai",label:"Melambai",priority:1,duration:2e3,cooldown:45e3,shape:"pulse",eyes:"normal",expr:{happy:.7},clip:"interact",pose:{head:[.04,0,.05],rightUpperArm:[.6,0,-1.05],rightLowerArm:[.3,0,0]},wave:[{bone:"rightLowerArm",axis:"z",amplitude:.35,hz:2.2}],sfx:"blip_soft"}],uS={head:{stroke:"sayang",hold:"tidur",double:"bangga",rapid:"kaget",tap:"sayang"},cheek:{tap:"malu",stroke:"sayang",double:"malu",rapid:"kaget",hold:"tidur"},shoulder:{tap:"lambai",double:"bangga",rapid:"kaget",hold:"peluk",stroke:"sayang"},hand:{tap:"lambai",hold:"peluk",double:"kaget",rapid:"geli"},belly:{tap:"ketawa",rapid:"geli",double:"marah",hold:"peluk"},hip:{tap:"malu",double:"kaget",rapid:"geli",hold:"malu",stroke:"malu"},leg:{tap:"kaget",rapid:"marah",double:"geli"}},hS={head:"sayang",cheek:"malu",shoulder:"lambai",hand:"lambai",belly:"ketawa",hip:"malu",leg:"kaget"};function Sl({zone:i,gesture:e}){let t=uS[i],n=t==null?void 0:t[e];return n||(e==="stroke"?i==="head"||i==="cheek"?"sayang":null:hS[i]||null)}var rh=new Map(cS.map(i=>[i.id,i]));function dS(i,e){var n;let t=Math.min(1,Math.max(0,e));if((i==null?void 0:i.shape)==="plateau"){let r=(n=i.ramp)!=null?n:.12;return Math.min(1,Math.min(t,1-t)/r)}return Math.sin(t*Math.PI)}function El(i){return Math.max(-1.2,Math.min(1.2,i))}function Mm(i={}){let e={clock:0,current:null,cooldowns:new Map,lastFinished:null,history:[],rejected:0,reducedMotion:i.reducedMotion?.35:1,rejectUntil:0};function t(o){let a=e.cooldowns.get(o)||0;return Math.max(0,a-e.clock)}function n(o,a={}){var h;let l=rh.get(o);if(!l)return!1;let c=a.force===!0,u=(h=a.priority)!=null?h:l.priority;return e.current&&u<e.current.priority&&!c||!c&&t(o)>0||!c&&e.lastFinished===o&&e.current===null&&l.duration<2500?(e.rejected+=1,!1):(e.current={style:l,id:o,priority:u,startedAt:e.clock,duration:l.duration,source:a.source||"auto",fired:new Set},e.history.push({id:o,at:e.clock,source:e.current.source}),e.history.length>40&&e.history.shift(),l.rejectTouchMs&&(e.rejectUntil=e.clock+l.rejectTouchMs),!0)}function r(o="interrupt"){return e.current?(e.current=null,e.lastFinished=o==="interrupt"?null:e.lastFinished,!0):!1}function s(o){let a=Math.max(0,Number(o)||0)*1e3;e.clock+=a;let l={styleId:null,label:null,progress:0,layers:{},expression:{},eyes:"normal",yaw:0,nudge:null,sfx:[],rejectTouch:e.clock<e.rejectUntil},c=e.current;if(!c)return l;let u=e.clock-c.startedAt;if(u>=c.duration)return e.cooldowns.set(c.id,e.clock+c.style.cooldown),e.lastFinished=c.id,e.current=null,l;let h=u/c.duration,d=dS(c.style,h)*e.reducedMotion;l.styleId=c.id,l.label=c.style.label,l.progress=Number(h.toFixed(4)),l.eyes=c.style.eyes||"normal",l.yaw=(c.style.yaw||0)*d,l.nudge=c.style.nudge||null;for(let[p,_]of Object.entries(c.style.pose||{})){let g=l.layers[p]=l.layers[p]||{x:0,y:0,z:0};g.x+=El(_[0]*d),g.y+=El(_[1]*d),g.z+=El(_[2]*d)}for(let p of c.style.wave||[]){let _=l.layers[p.bone]=l.layers[p.bone]||{x:0,y:0,z:0},g=2*Math.PI*p.hz*(u/1e3)+(p.phase||0);_[p.axis]=El(_[p.axis]+Math.sin(g)*p.amplitude*d)}for(let[p,_]of Object.entries(c.style.expr||{}))l.expression[p]=Number((_*d).toFixed(3));let f=(p,_)=>{!p||c.fired.has(p)||h+.001<_||(c.fired.add(p),l.sfx.push(p))};return f(c.style.sfx,.02),c.style.sfxFollow&&f(c.style.sfxFollow.name,c.style.sfxFollow.at),l}return{state:e,trigger:n,interrupt:r,update:s,cooldownLeft:t,get active(){return e.current?e.current.id:null},clipFor(o){var a,l,c;return((a=rh.get(o))==null?void 0:a.clip)||((c=(l=rh.get(o))==null?void 0:l.clips)==null?void 0:c[0])||null},debug(){var o;return{clock:Math.round(e.clock),active:((o=e.current)==null?void 0:o.id)||null,lastFinished:e.lastFinished,rejected:e.rejected,history:e.history.slice(-5).map(a=>a.id)}}}}var Tl={maxPixelRatio:2,cameraFov:26,targetFps:30,heightPadding:1.06},fS=new URLSearchParams(window.location.search).get("mode")==="preview",x={renderer:null,scene:null,camera:null,clock:null,vrm:null,mixer:null,currentAction:null,avatarUrl:null,avatarInfo:null,ready:!1,paused:!1,slice:{offsetX:0,offsetY:0,width:1,height:1},scale:100,targetFps:30,quality:"medium",blinkTimer:0,blinkPhase:0,poseBlend:0,restPose:{},blinkDuration:.16,idleTime:0,frameBudget:1/30,lastFrameTime:0,framesThisSecond:0,fpsReportAt:0,governor:rm({targetFps:Tl.targetFps}),renderScale:1,workMsAvg:0,statsReportAt:0,textureInfo:null,talking:0,talkSeed:0,motion:hm(),behavior:fm(),behaviorEnabled:!0,interacted:!1,interactedEver:!1,builtinClip:null,clipName:null,clipOverride:null,clipAppliedAt:0,clipLog:[],clipCache:new Map,seated:!1,sittingEnabled:!0,pendingChain:null,headpatUntil:0,touch:ym(),reactions:Mm(),reactionFrame:null,lastReactionAt:0,reactionExprKeys:new Set,reactionEyesActive:!1,reactionStyle:null,sceneYaw:0,lastNudgeAt:0,speech:null,animationName:null,loop:!0,speed:1,lostContext:!1,preview:fS};function We(i,e={}){let t=JSON.stringify({type:i,...e});try{window.MateBridge&&typeof window.MateBridge.postMessage=="function"&&window.MateBridge.postMessage(t)}catch(n){}window.__MATE_TEST__&&(window.__MATE_EVENTS__||(window.__MATE_EVENTS__=[])).push({type:i,...e})}function wi(i,e,t=!1){We("error",{code:i,message:e,fatal:t});let n=document.getElementById("error");n&&(n.hidden=!1,n.textContent=e)}function Ai(){return{width:Math.max(1,window.innerWidth),height:Math.max(1,window.innerHeight)}}function pS(){let i=document.getElementById("stage"),{width:e,height:t}=Ai(),n=new nl({canvas:i,alpha:!0,antialias:x.quality!=="low",powerPreference:"high-performance",premultipliedAlpha:!0,preserveDrawingBuffer:window.__MATE_TEST__===!0});n.setClearColor(0,0),n.setPixelRatio(Math.min(window.devicePixelRatio||1,Tl.maxPixelRatio)),n.setSize(e,t,!1),n.outputColorSpace=Tt,n.toneMapping=bn;let r=new Nr;r.background=null;let s=new wt(Tl.cameraFov,e/t,.05,60);s.position.set(0,1.25,3.2),s.lookAt(0,1.1,0),r.add(new Fs(16777215,Math.PI*.62));let o=new Ei(16777215,Math.PI*.42);o.position.set(.6,2.2,2.4),r.add(o);let a=new Ei(14674414,Math.PI*.16);a.position.set(-1.4,1.4,-1.8),r.add(a),i.addEventListener("webglcontextlost",l=>{l.preventDefault(),x.lostContext=!0,wi("gl-lost","Konteks WebGL hilang. Avatar akan dipulihkan saat layar aktif kembali.",!1)}),i.addEventListener("webglcontextrestored",()=>{x.lostContext=!1,We("context-restored"),x.avatarUrl&&wm(x.avatarUrl)}),x.renderer=n,x.scene=r,x.camera=s,x.clock=new ks}function mS(){let i=new rl;return i.register(e=>new wp(e)),i.register(e=>new tm(e)),i}function Em(i){let e=bl(i);if(!e||!x.camera)return null;let t=[e.min.x,e.max.x],n=[e.min.y,e.max.y],r=[e.min.z,e.max.z],s=[];for(let p of t)for(let _ of n)for(let g of r)s.push([p,_,g]);let o=1/0,a=-1/0,l=1/0,c=-1/0,u=new w;s.forEach(([p,_,g])=>{u.set(p,_,g).project(x.camera),o=Math.min(o,u.x),a=Math.max(a,u.x),l=Math.min(l,u.y),c=Math.max(c,u.y)});let{width:h,height:d}=Ai(),f=p=>Math.round(p);return{top:f((1-c)/2*d),bottom:f((1+l)/2*d),left:f((1+o)/2*h),right:f((1-a)/2*h)}}function bl(i){let e=new It,t=new w,n=["head","neck","chest","spine","hips","leftShoulder","rightShoulder","leftHand","rightHand","leftUpperLeg","rightUpperLeg","leftLowerLeg","rightLowerLeg","leftFoot","rightFoot"],r=null,s=0;if(n.forEach(c=>{var h,d,f;let u=((h=i.humanoid)==null?void 0:h.getNormalizedBoneNode(c))||((f=(d=i.humanoid)==null?void 0:d.getRawBoneNode)==null?void 0:f.call(d,c));u&&(u.getWorldPosition(t),s+=1,e.expandByPoint(t.clone()),c==="head"&&r===null&&(r=t.y))}),e.isEmpty()||s<8)return null;let o=new w;if(e.getSize(o),o.y<.4||o.x<.05)return null;let a=Math.max(o.y*.12,.05),l=Math.max(o.y*.17,.09);return e.min.y-=l,e.max.y+=a,e}function gS(){var g,m,y;let i=x.renderer,e=(g=i==null?void 0:i.getContext)==null?void 0:g.call(i);if(!e)return null;let t=new Je;i.getViewport(t);let n=i.getSize(new Ae),r=new Ae(e.drawingBufferWidth,e.drawingBufferHeight),s=new Nr,o=new ii(-1,1,1,-1,0,1),a=new Et(new Gi(2,2),new Bt({color:16711680,depthTest:!1,depthWrite:!1}));s.add(a);let l=new fe;i.getClearColor(l);let c=i.getClearAlpha();i.setRenderTarget(null),i.setScissorTest(!1),i.setClearColor(0,0),i.clear(),i.render(s,o);let u=r.x,h=r.y,d=new Uint8Array(u*h*4);e.readPixels(0,0,u,h,e.RGBA,e.UNSIGNED_BYTE,d);let f=S=>{let v=h,A=-1,R=u,I=-1;for(let L=0;L<h;L+=2)for(let M=0;M<u;M+=2){let T=(L*u+M)*4+S;d[T]>8&&(L<v&&(v=L),L>A&&(A=L),M<R&&(R=M),M>I&&(I=M))}return A<0?null:{minX:R,maxX:I,minY:v,maxY:A}},p=f(0),_=f(3);return i.setClearColor(l.getHex(),c),a.geometry.dispose(),a.material.dispose(),{viewport:[t.x,t.y,t.z,t.w],size:[n.x,n.y],buffer:[u,h],scissorTest:(y=(m=i.getScissorTest)==null?void 0:m.call(i))!=null?y:null,alphaTest:{top:_?Number((1-(_.maxY+1)/h).toFixed(3)):null,bottom:_?Number((_.minY/h).toFixed(3)):null},redBox:p,alfaBox:_}}function _S(i){let e={},t=new w,n=new w;return i.scene.traverse(r=>{var h,d;if(!r.isMesh||!((d=(h=r.geometry)==null?void 0:h.attributes)!=null&&d.position))return;let s=r.geometry.attributes.position.count,o=Math.max(1,Math.floor(s/120)),a=1/0,l=-1/0,c=1/0,u=-1/0;for(let f=0;f<s;f+=o)r.isSkinnedMesh&&r.getVertexPosition?r.getVertexPosition(f,t):t.fromBufferAttribute(r.geometry.attributes.position,f),t.applyMatrix4(r.matrixWorld),a=Math.min(a,t.y),l=Math.max(l,t.y),n.copy(t).project(x.camera),c=Math.min(c,n.y),u=Math.max(u,n.y);e[(r.name||"mesh").slice(0,12)]={duniaY:[Number(a.toFixed(2)),Number(l.toFixed(2))],ndcY:[Number(c.toFixed(2)),Number(u.toFixed(2))]}}),e}function sh(i){if(!i||i.isEmpty()||!x.camera)return null;let e=[i.min.x,i.max.x],t=[i.min.y,i.max.y],n=[i.min.z,i.max.z],r=1/0,s=-1/0,o=1/0,a=-1/0,l=new w;for(let c of e)for(let u of t)for(let h of n)l.set(c,u,h).project(x.camera),r=Math.min(r,l.x),s=Math.max(s,l.x),o=Math.min(o,l.y),a=Math.max(a,l.y);return{left:Number(((1+r)/2).toFixed(3)),right:Number(((1-s)/2).toFixed(3)),top:Number(((1-a)/2).toFixed(3)),bottom:Number(((1+o)/2).toFixed(3))}}function xS(i){var r,s;let e=new It,t=new w,n=["head","hips","leftFoot","rightFoot","leftHand","rightHand"];for(let o of n){let a=(s=(r=i.humanoid)==null?void 0:r.getRawBoneNode)==null?void 0:s.call(r,o);a&&(a.getWorldPosition(t),e.expandByPoint(t.clone()))}return e.isEmpty()?null:e}function bm(i){if(!(i!=null&&i.scene))return null;let e=new It().setFromObject(i.scene);return e.isEmpty()?null:e}function vS(){var c,u;let i=(u=(c=x.renderer)==null?void 0:c.getContext)==null?void 0:u.call(c);if(!i)return null;let e=i.drawingBufferWidth,t=i.drawingBufferHeight;if(!e||!t)return null;let n=new Uint8Array(e*t*4);i.readPixels(0,0,e,t,i.RGBA,i.UNSIGNED_BYTE,n);let r=e,s=-1,o=t,a=-1,l=0;for(let h=0;h<t;h+=4){let d=h*e*4;for(let f=0;f<e;f+=4)n[d+f*4+3]>8&&(l+=1,f<r&&(r=f),f>s&&(s=f),h<o&&(o=h),h>a&&(a=h))}return s<0?{empty:!0,width:e,height:t}:{left:Number((r/e).toFixed(3)),right:Number((1-(s+1)/e).toFixed(3)),top:Number((1-(a+1)/t).toFixed(3)),bottom:Number((o/t).toFixed(3)),coverage:Number((l*16/(e*t)).toFixed(3)),drawW:e,drawH:t}}function wl(i,e=!1){let t=bl(i),n=bm(i),r=new It;if(t&&!t.isEmpty()&&r.union(t),n&&!n.isEmpty()&&r.union(n),r.isEmpty())return;let s=new w,o=new w;r.getSize(s),r.getCenter(o);let a=Math.max(s.y,.1);!x.baseHeight&&!x.seated&&(x.baseHeight=a);let l=Math.max(a,(x.baseHeight||a)*.9);x.frameHeight=l;let c=x.camera.fov*Math.PI/180,u=g=>g/(2*Math.tan(c/2)),h=g=>g/(2*Math.tan(c/2)*Math.max(.1,x.camera.aspect)),d=1.18;if(!e&&x.frameHeight&&Math.abs(l-x.frameHeight)/x.frameHeight<.06){x.cameraLookAt=o.clone();return}let f=u(l*d),p=h(Math.max(s.x,.1)*d),_=Math.max(f,Math.min(p,f*1.25));x.cameraTarget=x.cameraTarget||new w,x.cameraTarget.set(o.x,o.y,o.z+_),x.cameraLookAt=o.clone(),x.camera.position.copy(x.cameraTarget),x.camera.lookAt(o.x,o.y,o.z),x.camera.updateProjectionMatrix(),x.vrm.scene.scale.setScalar(1)}function yS(i){let e=[];return i.scene.traverse(t=>{var r,s,o,a,l,c,u,h;if(!t.isMesh)return;let n=Array.isArray(t.material)?t.material[0]:t.material;e.push({name:(t.name||"mesh").slice(0,24),skinned:!!t.isSkinnedMesh,visible:t.visible!==!1,alphaMode:(n==null?void 0:n.alphaMode)||null,transparent:!!(n!=null&&n.transparent),opacity:(r=n==null?void 0:n.opacity)!=null?r:null,alphaTest:(s=n==null?void 0:n.alphaTest)!=null?s:null,depthWrite:(o=n==null?void 0:n.depthWrite)!=null?o:null,colorWrite:(a=n==null?void 0:n.colorWrite)!=null?a:null,hasMap:!!(n!=null&&n.map),mapLoaded:n!=null&&n.map?!!n.map.image:null,count:(h=(u=(c=(l=t.geometry)==null?void 0:l.attributes)==null?void 0:c.position)==null?void 0:u.count)!=null?h:0})}),{total:e.length,parts:e.slice(0,8)}}function MS(i){var s,o,a,l,c,u,h,d;let e=i.meta||{},t=Object.keys(((s=i.expressionManager)==null?void 0:s.expressionMap)||{}),n=Object.keys(((o=i.humanoid)==null?void 0:o.humanBones)||{}),r=0;return(l=(a=i.springBoneManager)==null?void 0:a.joints)==null||l.forEach(()=>{r+=1}),{name:e.name||e.title||"Tanpa nama",version:e.metaVersion==="0"?"VRM 0.x":"VRM 1.0",authors:e.authors||(e.author?[e.author]:[]),licenseUrl:e.licenseUrl||e.otherLicenseUrl||null,redistribution:(u=(c=e.allowRedistribution)!=null?c:e.redistributionAllowed)!=null?u:null,commercial:(d=(h=e.commercialUsage)!=null?h:e.commercialUssageName)!=null?d:null,expressions:t.slice(0,24),humanoidBones:n.length,springJoints:r}}async function wm(i){var e;if(!(!x.vrm&&!i)){x.ready=!1,x.avatarUrl=i,We("avatar-loading",{url:i}),x.vrm&&(x.scene.remove(x.vrm.scene),ci.deepDispose(x.vrm.scene),x.vrm=null,x.mixer=null,x.currentAction=null);try{let n=(await(x.clipCache.has(i)?x.clipCache.get(i):Cm(i))).userData.vrm;if(!n){wi("not-vrm","Berkas terbaca, tetapi tidak berisi data VRM.",!0);return}ci.rotateVRM0(n),x.drawCount={},n.scene.traverse(o=>{o.frustumCulled=!1,o.isMesh&&o.material&&(o.material.side===void 0&&(o.material.side=en),o.onBeforeRender=()=>{let a=o.name||"mesh";x.drawCount[a]=(x.drawCount[a]||0)+1})});let r=x.quality==="low"?512:x.quality==="medium"?1024:2048;x.textureInfo=sm(n.scene,r),We("textures",{resized:x.textureInfo.resized,kept:x.textureInfo.skipped,maxSize:x.textureInfo.maxSize}),x.scene.add(n.scene),x.vrm=n,We("debug-mesh",yS(n)),FS(),x.avatarInfo=MS(n),x.governor.reset(),x.renderScale=1,Al(),x.mixer=new Hs(n.scene),x.mixer.addEventListener("finished",CS),wl(n),x.ready=!0,x.readyAt=performance.now(),x.idleTime=0,x.baseHeight=null,x.restPose=im(n);let s=(e=n.humanoid)==null?void 0:e.getNormalizedBoneNode("hips");x.hipsRest=s?{x:s.position.x,z:s.position.z}:null,x.motion.clearBase(),x.behavior.reset(performance.now()),x.interactedEver=!1,x.poseBlend=1,ao(n,1,x.restPose),We("avatar-ready",{info:x.avatarInfo}),x.clipName=null,x.clipOverride=null,x.seated&&(x.pendingSeated=!1,or("sitting_idle",{manual:!1,reason:"duduk",loop:!0}),x.reframeAt=performance.now()+400,We("seated",{seated:!0}))}catch(t){wi("load-failed",`Gagal memuat avatar: ${(t==null?void 0:t.message)||t}`,!0)}}}async function Am(i,e,t={}){var n;if(ch(),!x.vrm||!x.mixer){wi("no-avatar","Pilih avatar sebelum memutar animasi.",!1);return}try{let s=(n=(await(x.clipCache.has(i)?x.clipCache.get(i):Cm(i))).userData.vrmAnimations)==null?void 0:n[0];if(!s){wi("not-vrma","Berkas bukan animasi VRM (.vrma).",!1);return}let o=em(s,x.vrm),a=x.mixer.clipAction(o);a.setLoop(t.loop===!1?Ya:Za,1/0),x.pendingChain=t.chain?rs[t.chain]||t.chain:null,a.clampWhenFinished=!0,a.timeScale=x.speed,x.currentAction&&x.currentAction!==a&&x.currentAction.fadeOut(.25),a.reset().fadeIn(.25).play(),x.currentAction=a,x.motion.clearBase(),x.animationName=e||null,We("animation-playing",{name:e||null,duration:o.duration})}catch(r){wi("animation-failed",`Gagal memuat animasi: ${(r==null?void 0:r.message)||r}`,!1)}}var ES=250,rs={idle:"idle_loop",talk:"idle_talk",walk:"walk_loop",dance:"dance_loop",interact:"interact",idle_torch:"idle_torch",spell_idle:"spell_idle",sitting_enter:"sitting_enter",sitting_idle:"sitting_idle",sitting_exit:"sitting_exit",sitting_talk:"sitting_talk",crouch_idle:"crouch_idle",jump_start:"jump_start",jump_land:"jump_land",jump_loop:"jump_loop",push_loop:"push_loop",walk_formal:"walk_formal",jog_loop:"jog_loop",kneel_fix:"kneel_fix",crouch_walk:"crouch_walk",drive_idle:"drive_idle",sprint_loop:"sprint_loop",swim_idle:"swim_idle",swim_fwd:"swim_fwd",pickup:"pickup",spell_enter:"spell_enter",spell_exit:"spell_exit",spell_shoot:"spell_shoot",roll:"roll"},Rm=new Set(["pickup","spell_enter","spell_exit","spell_shoot","roll","jump_start","jump_land"]);function SS(i){return new URL(`../animations/${i}.vrma`,window.location.href).href}function Cm(i){if(!x.clipCache.has(i)){let e=mS().loadAsync(i).catch(t=>{throw x.clipCache.delete(i),t});x.clipCache.set(i,e)}return x.clipCache.get(i)}function oh(i){let e=!!i;return e===x.seated?x.seated:(x.seated=e,x.clipOverride=null,x.behavior.reset(performance.now()),ch(),!x.vrm||!x.mixer?(x.pendingSeated=e,x.seated):(e?(x.motion&&x.motion.setLocomotion("idle"),or("sitting_enter",{manual:!1,reason:"duduk",loop:!1,chain:"sitting_idle"})):or("sitting_exit",{manual:!1,reason:"berdiri",loop:!1,chain:"idle"}),wl(x.vrm),x.reframeAt=performance.now()+900,We("seated",{seated:x.seated}),x.seated))}function Pm(){var e,t,n;let i=(e=x.motion)==null?void 0:e.state;return{talking:x.talking>0||!!x.speech,locomotion:(t=i==null?void 0:i.locomotion)!=null?t:"idle",idleMs:Math.round(((n=i==null?void 0:i.idleSeconds)!=null?n:0)*1e3),interacted:x.interacted,edgeSeatAvailable:x.sittingEnabled&&!x.seated&&x.ready,armed:x.interactedEver}}function TS(){let i=Pm();return x.seated?i.talking?"sitting_talk":"sitting_idle":i.talking?"talk":x.clipOverride?x.clipOverride:i.locomotion==="walk"?"walk":i.locomotion==="dance"?"dance":x.behavior.currentClip()||"idle"}function bS(i,e){x.clipName=i,We("clip-changed",{clip:i,reason:e}),x.clipAppliedAt=performance.now(),x.clipLog.push({clip:i,reason:e,at:Math.round(performance.now())}),x.clipLog.length>40&&x.clipLog.shift()}async function or(i,e={}){if(!x.vrm||!x.mixer)return wi("no-avatar","Pilih avatar sebelum memutar animasi.",!1),!1;let t=rs[i]||(i in rs?rs[i]:null),r=(typeof i=="string"&&!(i in rs)?t:null)||t;return r?(x.builtinClip===r&&x.currentAction||(x.builtinClip=r,bS(r,e.reason||"manual"),e.manual!==!1&&(x.clipOverride=r),await Am(SS(r),r,{loop:e.loop!==!1})),!0):!1}function wS(){var e,t;let i=(t=(e=x.vrm)==null?void 0:e.humanoid)==null?void 0:t.getNormalizedBoneNode("hips");!i||!x.hipsRest||(i.position.x=x.hipsRest.x,i.position.z=x.hipsRest.z)}function AS(i){let e=x.cameraTarget;if(!e||!x.camera)return;let t=Math.min(1,i*6);x.camera.position.lerp(e,t),x.cameraLookAt&&x.camera.lookAt(x.cameraLookAt)}function RS(){if(!x.ready||!x.vrm||!x.mixer)return;let i=x.behaviorEnabled?x.behavior.update(performance.now(),Pm()):null;if((i==null?void 0:i.id)==="sit_down"&&!x.seated){oh(!0);return}let e=TS();if(e===x.clipName||performance.now()-x.clipAppliedAt<ES)return;let t={manual:!1,reason:"state"};Rm.has(e)&&(t.loop=!1,t.chain="idle"),or(e,t).catch(()=>{}),x.reframeAt=performance.now()+320}function CS(i){if(!x.pendingChain||x.currentAction&&i.action!==x.currentAction)return;let e=x.pendingChain;x.pendingChain=null,or(e,{manual:!1,reason:"chain"}).catch(()=>{})}function ch(){x.interacted=!0,x.interactedEver=!0}function Sm(){x.currentAction&&(x.currentAction.fadeOut(.2),x.currentAction=null),x.mixer&&x.mixer.stopAllAction(),x.animationName=null,x.builtinClip=null,x.clipName=null,x.clipOverride=null,x.motion.clearBase(),x.behavior.reset(performance.now()),x.vrm&&(ao(x.vrm,1,x.restPose),x.vrm.update(0)),We("animation-stopped")}function PS(i){var t;let e=(t=x.vrm)==null?void 0:t.expressionManager;if(e){if(performance.now()<x.headpatUntil){e.setValue("blink",1);return}if(x.blinkTimer-=i,x.blinkPhase===0&&e.setValue("blink",0),x.blinkPhase===0&&x.blinkTimer<=0)x.blinkPhase=1,x.blinkTimer=x.blinkDuration;else if(x.blinkPhase===1){let n=1-Math.abs(x.blinkTimer/x.blinkDuration-.5)*2;e.setValue("blink",Math.max(0,Math.min(1,n))),x.blinkTimer<=0&&(x.blinkPhase=2,x.blinkTimer=.05)}else x.blinkPhase===2&&x.blinkTimer<=0&&(e.setValue("blink",0),x.blinkPhase=0,x.blinkTimer=2.4+Math.random()*4.6)}}function IS(i){var t,n;let e=(t=x.vrm)==null?void 0:t.expressionManager;if(e){if(x.speech){let r=performance.now()-x.speech.startedAt;if(r>=x.speech.durationMs||x.speech.levels.length===0){x.speech=null,x.talking=0,e.setValue("aa",0),We("talking-stopped",{});return}let s=r/x.speech.durationMs,o=Math.min(x.speech.levels.length-1,Math.max(0,Math.floor(s*x.speech.levels.length)));e.setValue("aa",(n=x.speech.levels[o])!=null?n:0);return}if(x.talking>0){x.talking-=i*1e3,x.talkSeed+=i*12;let r=.25+Math.abs(Math.sin(x.talkSeed))*.45;e.setValue("aa",Math.min(1,r)),x.talking<=0&&e.setValue("aa",0)}}}function LS(i){x.vrm&&(ao(x.vrm,1,x.restPose),x.idleTime+=i,NS())}function NS(){var t;if(!x.behaviorEnabled||!x.vrm||x.preview||window.__MATE_TEST__===!0||x.reactions.active)return;let i=x.motion.state.idleSeconds,e=(t=x.behavior.state)==null?void 0:t.mood;i>=240?ui("tidur",{source:"auto",priority:1}):i>=150?ui("ngantuk",{source:"auto",priority:1}):i>=95?ui("malas",{source:"auto",priority:1}):i>=55?ui("boring",{source:"auto",priority:1}):i>=18&&i<=22&&e==="ceria"&&ui("lompat",{source:"auto",priority:1})}function Im(i){var a,l,c,u,h,d,f,p,_,g,m;if(requestAnimationFrame(Im),!x.ready||x.paused||x.lostContext)return;let e=1e3/Math.max(5,x.targetFps);if(i-x.lastFrameTime<e-1)return;let t=Math.min(.05,Math.max(.001,(i-x.lastFrameTime)/1e3));x.lastFrameTime=i;let n=performance.now();if(PS(t),LS(t),IS(t),RS(),x.motion.resetToBase(),x.mixer&&x.mixer.update(t),x.vrm){let y=performance.now(),S=x.lastReactionAt>0?Math.min(1.5,Math.max(.001,(y-x.lastReactionAt)/1e3)):t;x.lastReactionAt=y;let v=BS(S);x.motion.update(x.vrm,t,{talking:x.talking>0,interacted:x.interacted,reaction:v}),HS(v),x.interacted=!1,wS();let A=t>.02?Math.min(4,Math.ceil(t/.02)):1;for(let R=0;R<A;R+=1)x.vrm.update(t/A);x.reframeAt&&performance.now()>=x.reframeAt?(x.reframeAt=0,wl(x.vrm,!0)):i-(x.lastFrameCheck||0)>2500&&(x.lastFrameCheck=i,wl(x.vrm)),AS(t)}if(x.renderer.render(x.scene,x.camera),i-(x.paintReportAt||0)>=3e3){if(x.paintReportAt=i,window.__MATE_PAINT_DEBUG__===!0){let y=vS();y&&We("debug-paint",y)}if(x.vrm&&!x.skinReportedAt&&i-x.readyAt>5e3){x.skinReportedAt=i;try{We("debug-skin",{fov:x.camera.fov,meshes:_S(x.vrm)})}catch(y){We("debug-skin",{error:String(y&&y.message?y.message:y)})}try{We("debug-gpu",gS())}catch(y){We("debug-gpu",{error:String(y&&y.message?y.message:y)})}}}let r=performance.now()-n;x.workMsAvg=x.workMsAvg===0?r:x.workMsAvg*.9+r*.1;let s=x.governor.sample(r);s.changed!==0&&(x.renderScale=s.scale,Al(),We("quality-change",{scale:x.renderScale,level:x.governor.level,direction:s.changed<0?"turun":"naik",avgWorkMs:Math.round(s.avgWorkMs||r)})),x.framesThisSecond+=1,i-x.fpsReportAt>=1e3&&(We("fps",{value:x.framesThisSecond,workMs:Math.round(x.workMsAvg)}),x.framesThisSecond=0,x.fpsReportAt=i);let o=x.motionLogAt?5e3:1500;if(i-(x.motionLogAt||0)>=o){x.motionLogAt=i;let y=x.motion.debug(),S=(l=(a=window.MateEngine)==null?void 0:a.poseMetrics)==null?void 0:l.call(a),v={...y,clip:x.builtinClip,behavior:x.behavior.currentId(),mood:x.behavior.state.mood,armLeftDeg:(c=S==null?void 0:S.leftArmDeg)!=null?c:null,armRightDeg:(u=S==null?void 0:S.rightArmDeg)!=null?u:null,seated:x.seated,bodyGap:Em(x.vrm)};We("motion-state",v)}if(x.vrm&&i-(x.bodyBoxAt||0)>=166){x.bodyBoxAt=i;let y=Em(x.vrm);if(y){let S=x.bodyBoxLast;if(!S||Math.abs(S.left-y.left)>6||Math.abs(S.top-y.top)>6||Math.abs(S.right-y.right)>6||Math.abs(S.bottom-y.bottom)>6){x.bodyBoxLast=y;let{width:A,height:R}=Ai(),I=DS({left:y.left/A,top:y.top/R,right:y.right/A,bottom:y.bottom/R});We("body-box",{left:Number(I.left.toFixed(4)),top:Number(I.top.toFixed(4)),right:Number(I.right.toFixed(4)),bottom:Number(I.bottom.toFixed(4)),cssWidth:A,cssHeight:R,slice:x.slice})}}}if(i-(x.viewReportAt||0)>=3e3){x.viewReportAt=i;let y=window.visualViewport;We("debug-view",{cssW:Math.round(window.innerWidth),cssH:Math.round(window.innerHeight),clientW:document.documentElement.clientWidth,clientH:document.documentElement.clientHeight,dpr:Number(window.devicePixelRatio.toFixed(2)),scrollY:Math.round(window.scrollY||0),vvScale:y?Number(y.scale.toFixed(2)):null,vvOffsetTop:y?Math.round(y.offsetTop):null,vvHeight:y?Math.round(y.height):null,canvasH:Ai().height,modelScale:Number(((p=(f=(d=(h=x.vrm)==null?void 0:h.scene)==null?void 0:d.scale)==null?void 0:f.x)!=null?p:0).toFixed(2)),camDistance:x.camera?Number(x.camera.position.distanceTo(x.cameraLookAt||x.camera.position).toFixed(2)):null,frameHeight:x.frameHeight?Number(x.frameHeight.toFixed(2)):null,pose:x.vrm?Object.keys(((_=x.vrm.humanoid)==null?void 0:_.humanBones)||{}).length:0,camPos:x.camera?[x.camera.position.x,x.camera.position.y,x.camera.position.z].map(S=>Number(S.toFixed(2))):null,lookAt:x.cameraLookAt?[x.cameraLookAt.x,x.cameraLookAt.y,x.cameraLookAt.z].map(S=>Number(S.toFixed(2))):null,aspect:Number(((m=(g=x.camera)==null?void 0:g.aspect)!=null?m:0).toFixed(3)),worldBox:(()=>{let S=bl(x.vrm);return S?{min:[S.min.x,S.min.y,S.min.z].map(v=>Number(v.toFixed(2))),max:[S.max.x,S.max.y,S.max.z].map(v=>Number(v.toFixed(2)))}:null})(),drawCalls:x.renderer.info.render.calls,triangles:x.renderer.info.render.triangles,glError:x.renderer.getContext().getError(),drawn:x.drawCount?Object.fromEntries(Object.entries(x.drawCount)):null,boneBox:sh(bl(x.vrm)),rawBoneBox:sh(xS(x.vrm)),meshBox:sh(bm(x.vrm))})}i-x.statsReportAt>=2e3&&(x.statsReportAt=i,We("stats",{...th(x.renderer,x.vrm),fpsTarget:x.targetFps,renderScale:Number(x.renderScale.toFixed(2)),qualityLevel:x.governor.level,workMs:Math.round(x.workMsAvg)}))}function US(){return x.quality==="low"?1:x.quality==="medium"?1.5:Tl.maxPixelRatio}function Al(){if(!x.renderer)return;let i=Math.min(window.devicePixelRatio||1,US());x.renderer.setPixelRatio(Math.max(.5,i*x.renderScale))}function ah(){if(!x.renderer)return;let{width:i,height:e}=Ai();Al(),x.renderer.setSize(i,e,!1),Lm()}function Lm(){let i=x.camera;if(!i)return;let{width:e,height:t}=Ai(),n=x.slice||{offsetX:0,offsetY:0,width:1,height:1},r=e/Math.max(.05,n.width),s=t/Math.max(.05,n.height);i.aspect=r/s,i.setViewOffset(r,s,n.offsetX*r,n.offsetY*s,e,t),i.updateProjectionMatrix()}function DS(i){let e=x.slice||{offsetX:0,offsetY:0,width:1,height:1};return{left:e.offsetX+i.left*e.width,top:e.offsetY+i.top*e.height,right:e.offsetX+i.right*e.width,bottom:e.offsetY+i.bottom*e.height}}function OS(i){x.quality=["low","medium","high"].includes(i)?i:"medium",ah()}function lh(i,e){if(!x.vrm||!x.mixer)return Promise.resolve(!1);let t=Rm.has(i);x.clipOverride=i;let n={manual:!1,reason:e,loop:!t};return t&&(n.chain="idle"),or(i,n).catch(()=>!1)}function FS(){x.sceneBaseYaw=x.vrm?x.vrm.scene.rotation.y:0}function BS(i){let e=x.reactions.update(i);if(x.reactionFrame=e,e.sfx&&e.sfx.length>0)for(let n of e.sfx)We("reaction-sfx",{name:n,style:e.styleId});e.styleId?x.reactionStyle=e.styleId:x.reactionStyle&&(We("reaction-end",{style:x.reactionStyle}),x.clipOverride&&(x.clipOverride=null),x.reactionStyle=null);let t=(x.sceneBaseYaw||0)+(e.yaw||0);return x.sceneYaw+=(t-x.sceneYaw)*Math.min(1,i*6),x.vrm&&(x.vrm.scene.rotation.y=x.sceneYaw),e}function kS(i,e){if(!x.vrm||!x.camera)return null;let{width:t,height:n}=Ai(),r=new Ae(i/t*2-1,-(e/n)*2+1);try{x.raycaster||(x.raycaster=new Vs),x.raycaster.setFromCamera(r,x.camera);let s=x.raycaster.intersectObject(x.vrm.scene,!0).filter(o=>o.object&&(o.object.isMesh||o.object.isSkinnedMesh));if(s.length>0){let o=s[0].point.clone(),a=xm(x.vrm,o);if(a&&a.inside)return a}}catch(s){}return vm(x.vrm,x.camera,r,{width:t,height:n})}function Tm(){return x.reactions.active==="tidur"?(x.reactions.interrupt("wake"),We("reaction-end",{style:"tidur",reason:"wake"}),lh("sitting_exit","wake").catch(()=>{}),!0):!1}function ui(i,e={}){if(!x.reactions.trigger(i,e))return We("reaction-rejected",{style:i,active:x.reactions.active}),!1;x.interacted=!0,x.interactedEver=!0,x.motion.state.idleSeconds=0,x.motion.state.sleepiness=0;let n=x.reactions.state.current.style;x.reactionStyle=i,n.nudge&&performance.now()-x.lastNudgeAt>1200&&(x.lastNudgeAt=performance.now(),We("nudge",{dx:n.nudge[0],dy:n.nudge[1],style:i}));let r=x.reactions.clipFor(i);return r&&!x.clipOverride&&(i==="tidur"?lh("sitting_enter","tidur").catch(()=>{}):lh(r,`reaksi:${i}`).catch(()=>{})),We("reaction",{style:i,label:n.label,source:e.source||"touch",zone:e.zone||null}),!0}function HS(i){var n;let e=(n=x.vrm)==null?void 0:n.expressionManager;if(!e)return;let t=new Set(Object.keys(i.expression||{}));for(let r of x.reactionExprKeys)t.has(r)||e.setValue(r,0);for(let[r,s]of Object.entries(i.expression||{}))e.setValue(r,s);if(x.reactionExprKeys=t,!i.styleId&&x.reactionEyesActive&&(e.setValue("blink",0),x.blinkPhase=0,x.blinkTimer=1.2,x.reactionEyesActive=!1),i.styleId){let r={closed:1,squint:.88,half:.35,slow:.5,wide:0,angry:0,normal:null}[i.eyes];r!=null&&(e.setValue("blink",r),x.reactionEyesActive=!0)}}function VS(i,e,t){var l;if(!x.vrm||x.paused)return null;let n=performance.now();x.touch.tick(n);let{width:r,height:s}=Ai(),o=Math.min(1,Math.max(0,Number(e)||0))*r,a=Math.min(1,Math.max(0,Number(t)||0))*s;if(i==="down"){Tm();let c=kS(o,a);return x.touch.down((c==null?void 0:c.zone)||"belly",o,a,n),x.touchZone=c,We("touch-zone",{zone:(c==null?void 0:c.zone)||null,inside:!!(c!=null&&c.inside)}),null}if(i==="move"){let c=x.touch.move(o,a,n);if((c==null?void 0:c.type)==="stroke"){let u=Sl({zone:"head",gesture:"stroke"});return ui(u,{source:"touch",zone:"head"}),u}return null}if(i==="up"){let c=x.touch.up(n);if(!c)return null;let u=c.zone||((l=x.touchZone)==null?void 0:l.zone)||"belly";c.type==="hold"&&Tm();let h=Sl({zone:u,gesture:c.type});return h?(ui(h,{source:"touch",zone:u}),h):null}return null}window.MateEngine={setWindowSlice:i=>{if(!i)return;let e=t=>Math.max(0,Math.min(1,Number(t)||0));x.slice={offsetX:e(i.offsetX),offsetY:e(i.offsetY),width:Math.max(.05,e(i.width)),height:Math.max(.05,e(i.height))},Lm(),We("window-slice",x.slice)},loadAvatar:wm,loadAnimation:Am,stopAnimation:Sm,play:()=>{x.paused=!1},pause:()=>{x.paused=!0},setPaused:i=>{x.paused=!!i},setTargetFps:i=>{x.targetFps=Math.max(5,Math.min(60,Number(i)||30)),x.governor.setTargetFps(x.targetFps)},setQuality:OS,setAnimationSpeed:i=>{x.speed=Math.max(.5,Math.min(2,Number(i)||1)),x.currentAction&&(x.currentAction.timeScale=x.speed)},debugPose:()=>{var t,n;let i=(n=(t=x.vrm)==null?void 0:t.humanoid)==null?void 0:n.getNormalizedBoneNode("leftUpperArm"),e=x.restPose.leftUpperArm||null;return{leftUpperArmZ:i?i.rotation.z:null,restZ:e?e.z:null,offsetZ:i&&e?i.rotation.z-e.z:null,hasRestPose:Object.keys(x.restPose).length>0,blend:x.poseBlend,animation:x.animationName}},setLocomotion:i=>{let e=x.motion.setLocomotion(i);return x.clipOverride=null,We("locomotion",{mode:e}),e},nextDance:()=>{let i=x.motion.nextDance();return x.clipOverride=null,We("locomotion",{mode:"dance",variant:i}),i},clipTimeline:()=>x.clipLog.slice(),behaviorTimeline:()=>x.behavior.timeline(),setSeated:i=>oh(i),seated:()=>x.seated,expressionValue:i=>{var e,t,n;return(n=(t=(e=x.vrm)==null?void 0:e.expressionManager)==null?void 0:t.getValue(i))!=null?n:null},setSittingEnabled:i=>(x.sittingEnabled=!!i,!x.sittingEnabled&&x.seated&&oh(!1),x.sittingEnabled),setDragVelocity:(i,e)=>{x.motion.setDrag(i,e),ch()},behaviorState:()=>({id:x.behavior.currentId(),mood:x.behavior.state.mood,clip:x.behavior.currentClip()}),setReducedMotion:i=>{x.motion.setReducedMotion(i)},setBehaviorEnabled:i=>(x.behaviorEnabled=!!i,x.behavior.reset(performance.now()),x.clipOverride=null,We("behavior-enabled",{enabled:x.behaviorEnabled}),x.behaviorEnabled),behaviorEnabled:()=>x.behaviorEnabled,react:i=>{x.interacted=!0,x.interactedEver=!0,i==="head"&&(x.headpatUntil=performance.now()+1600);let e=Sl({zone:i==="head"?"head":i==="shoulder"?"shoulder":"belly",gesture:"tap"});return ui(e,{source:"touch",zone:i})?e:null},pointer:(i,e,t)=>VS(i,e,t),tryReaction:i=>ui(i,{source:"explicit",force:!0}),reactionDebug:()=>({...x.reactions.debug(),style:x.reactionStyle,sceneYaw:Number(x.sceneYaw.toFixed(3)),expressions:[...x.reactionExprKeys]}),motionDebug:()=>x.motion.debug(),poseMetrics:()=>{var n,r,s,o,a,l,c,u,h;let i=(n=x.vrm)==null?void 0:n.humanoid;if(!i)return null;let e=i.getNormalizedBoneNode("hips"),t=(d,f)=>{let p=i.getNormalizedBoneNode(d),_=i.getNormalizedBoneNode(f);if(!p||!_)return null;let g=new w,m=new w;p.getWorldPosition(g),_.getWorldPosition(m);let y=m.sub(g).normalize(),S=new w(0,-1,0);if(e){let A=new Q;e.getWorldQuaternion(A),S.applyQuaternion(A).normalize()}let v=Math.max(-1,Math.min(1,y.dot(S)));return Number((Math.acos(v)*180/Math.PI).toFixed(1))};return{leftArmDeg:t("leftUpperArm","leftLowerArm"),rightArmDeg:t("rightUpperArm","rightLowerArm"),locomotion:(o=(s=(r=x.motion)==null?void 0:r.state)==null?void 0:s.locomotion)!=null?o:null,animationName:x.animationName,builtinClip:x.builtinClip,hasAction:!!x.currentAction,baseBones:(c=(l=(a=x.motion)==null?void 0:a.debug)==null?void 0:l.call(a).bones)!=null?c:0,seated:x.seated,sway:(h=(u=x.motion)==null?void 0:u.state)!=null&&h.drag?Number((Math.abs(x.motion.state.drag.vx)+Math.abs(x.motion.state.drag.vy)).toFixed(1)):0}},resetPose:()=>{var e,t;Sm(),x.motion.clearBase(),x.vrm&&(ao(x.vrm,1,x.restPose),x.vrm.update(0));let i=(t=(e=window.MateEngine).poseMetrics)==null?void 0:t.call(e);return We("pose-reset",i||{}),i},playBuiltin:i=>or(i),builtinClips:()=>Object.entries(rs).map(([i,e])=>({key:i,file:e})),setSpeechEnvelope:(i,e)=>{let t=Array.isArray(i)?i.map(n=>Math.max(0,Math.min(1,Number(n)||0))):[];return x.speech={levels:t,durationMs:Math.max(200,Number(e)||2e3),startedAt:performance.now()},x.talking=x.speech.durationMs,We("talking",{duration:x.speech.durationMs,source:"envelope",samples:t.length}),t.length},startTalking:i=>{var t;x.talking=Math.max(400,Math.min(2e4,Number(i)||2500)),x.talkSeed=0;let e=(t=x.vrm)==null?void 0:t.expressionManager;e&&(e.setValue("happy",.6),setTimeout(()=>e.setValue("happy",0),1200)),We("talking",{duration:x.talking})},stopTalking:()=>{var i,e;x.talking=0,(e=(i=x.vrm)==null?void 0:i.expressionManager)==null||e.setValue("aa",0)},trimMemory:()=>{var e,t,n,r,s;let i={animations:0,lists:!0};try{(e=x.mixer)==null||e.stopAllAction(),x.mixer&&(x.mixer.uncacheRoot((t=x.vrm)==null?void 0:t.scene),i.animations=1),(s=(r=(n=x.renderer)==null?void 0:n.renderLists)==null?void 0:r.dispose)==null||s.call(r),cn.clear()}catch(o){}We("memory-trimmed",i)},stats:()=>({...th(x.renderer,x.vrm),renderScale:x.renderScale,workMs:x.workMsAvg}),status:()=>({ready:x.ready,avatar:x.avatarInfo,animation:x.animationName,fps:x.targetFps,preview:x.preview,quality:x.quality})};async function zS(){var i,e;try{pS(),x.preview&&(x.targetFps=15,x.governor.setTargetFps(15),x.renderScale=.5,x.behaviorEnabled=!1,Al(),We("preview-mode",{fps:x.targetFps})),window.addEventListener("resize",ah),window.addEventListener("orientationchange",()=>setTimeout(ah,120)),document.addEventListener("visibilitychange",()=>We("visibility",{hidden:document.hidden})),requestAnimationFrame(Im),We("renderer-ready",{webgl2:!!((e=(i=x.renderer)==null?void 0:i.capabilities)!=null&&e.isWebGL2)})}catch(t){wi("init-failed",`Renderer gagal dimulai: ${(t==null?void 0:t.message)||t}`,!0)}}zS();})();
