/* ══════════════════════════════════════════
   낱글자 팡팡! — 한글 단어 버블슈터 (최종 3단 분리 완벽 적용본)
   ══════════════════════════════════════════ */

/* ---------- 사전 ---------- */
const DICT_BY_CAT = {
  '과일': ['사과','포도','딸기','수박','참외','자두','바나나','오렌지','레몬','복숭아','체리','망고','멜론','키위','앵두','살구','자몽','석류','토마토','대추','모과','매실','앵도','귤','감','배','밤','파인애플','블루베리','무화과','한라봉','청포도','머루','다래'],
  '동물': ['사자','호랑이','코끼리','토끼','다람쥐','거북이','고양이','강아지','원숭이','기린','하마','얼룩말','여우','늑대','사슴','너구리','개구리','병아리','오리','돼지','판다','펭귄','악어','고래','두더지','고슴도치','치타','표범','물개','바다표범','부엉이','까치','참새','비둘기','다람쥐','수달','청설모','두루미'],
  '먹거리': ['김밥','라면','김치','만두','피자','치킨','우유','국수','초밥','카레','계란','감자','고구마','두부','도넛','사탕','과자','주스','떡볶이','케이크','빙수','호빵','비빔밥','불고기','갈비','냉면','짜장면','짬뽕','순대','어묵','호떡','붕어빵','식혜','미역국','된장국','유부초밥','주먹밥'],
  '탈것': ['자동차','기차','비행기','자전거','버스','택시','트럭','로켓','소방차','구급차','경찰차','지하철','헬기','요트','유모차','오토바이','포클레인','트랙터','케이블카','잠수함','여객선','우주선','열기구','썰매','기관차','전동차','화물차'],
  '자연': ['나무','바다','하늘','구름','바람','무지개','태양','호수','파도','번개','안개','이슬','모래','폭포','언덕','계곡','노을','새벽','폭우','서리','우박','고드름','들판','절벽','동굴','갯벌','습지','오아시스','메아리','아지랑이','물결','파도','샛별']
};
const BONUS_WORDS = ['사과나무','바나나우유','포도나무','감나무','밤나무','대추나무','솔방울','도토리','다람쥐집','고양이집','비빔국수','볶음밥','김치찌개','된장찌개','고구마빵','바나나맛','딸기우유','초코우유','자동차길','소방관차'];
const GENERIC_WORDS = [
  '감기','안녕','사람','친구','생일','가족','학교','교실','책상','의자','창문','거울',
  '지갑','열쇠','우산','신발','양말','모자','장갑','안경','시계','달력','편지','소포',
  '병원','약국','은행','경찰','소방','공원','풍선','비누','수건','칫솔','치약','침대',
  '이불','베개','냄비','접시','컵','그릇','전화','사진','영화','음악','노래','그림',
  '가위','풀','공책','연필','지우개','필통','우유','물감','악기','피아노','바이올린',
  '축구','야구','농구','수영','달리기','줄넘기','자전거','인사','약속','선물','파티',
  '여행','바닷가','산책','휴식','청소','빨래','설거지','요리','식사','아침','점심',
  '저녁','오늘','내일','어제','아빠','엄마','언니','오빠','동생','할머니','할아버지',
  '이모','삼촌','선생님','의사','간호사','경찰관','소방관','요리사','화가','가수',
  '배우','기자','농부','어부','목수','우체부',
  '색깔','빨강','노랑','파랑','초록','보라','하양','검정','분홍','하늘','무늬','줄무늬',
  '봄','여름','가을','겨울','계절','날씨','맑음','흐림','기온','온도',
  '머리','얼굴','눈썹','입술','손가락','발가락','어깨','무릎','허리','손톱',
  '숫자','하나','둘','셋','넷','다섯','여섯','일곱','여덟','아홉','열',
  '월요일','화요일','수요일','목요일','금요일','토요일','일요일','주말','평일',
  '아침밥','점심밥','저녁밥','간식','후식','반찬','국물','양념',
  '교과서','수학','국어','영어','과학','미술','음악시간','체육','급식',
  '놀이터','그네','미끄럼틀','시소','정글짐','모래놀이',
  '기쁨','슬픔','화남','놀람','무서움','즐거움','행복','걱정',
  '마을','도시','시골','골목','다리','계단','엘리베이터','문','창','지붕',
  '봉투','상자','바구니','자루','보따리','가방','배낭',
  '동화책','만화책','일기장','수첩','도장','스티커',
  '눈사람','썰매타기','물놀이','불꽃놀이','캠핑','소풍','운동회',
  '거북선','한복','태극기','한글날','설날','추석','생일파티','졸업식','입학식'
];
const CATS = Object.keys(DICT_BY_CAT);
const MAX_STAGE = 100;
const MILESTONE_EVERY = 30;
const DICT = new Map();
for (const c of CATS) for (const w of DICT_BY_CAT[c]) if (w.length>=2) DICT.set(w,c);
for (const w of BONUS_WORDS) DICT.set(w,'보너스');
for (const w of GENERIC_WORDS) if (w.length>=2 && !DICT.has(w)) DICT.set(w,'생활');
const MAXW = 5;

/* ---------- 찰흙 색 ---------- */
const PALETTE = [
  ['#8fc98a','#4f8a52'],
  ['#e8a6c2','#c96f95'],
  ['#8fb8d8','#4f7fa8'],
  ['#e8c27a','#b8863f'],
  ['#e0dcd0','#b0a890'],
  ['#b39ad6','#7c5ba8']
];
let COLORMAP={};
const NCOL=6;
function colByIdx(i){ return PALETTE[((i%NCOL)+NCOL)%NCOL]; }
function colorOf(b){
  if(b&&typeof b==='object'&&typeof b.col==='number') return colByIdx(b.col);
  const ch=(typeof b==='string')?b:(b&&b.s)||'';
  let h=0; for(let i=0;i<ch.length;i++) h=(h*31+ch.charCodeAt(i))>>>0;
  return PALETTE[h%PALETTE.length];
}
function mapColors(pool){ }
function randCol(){ return Math.floor(Math.random()*NCOL); }

/* ---------- 캔버스 ---------- */
const cv=document.getElementById('cv'); let ctx=cv.getContext('2d');
let W=0,H=0,R=0,ROWH=0,DPR=1;
const COLS=7;
let BX=0,BY=0,BW=0,BH=0;
const FRAME=9;
const BG_IMG_W=900, BG_IMG_H=1572;
const BG_FRAME={left:0.028, right:0.972, top:0.148};

/* ✨ 3단 분리 완벽 대응 리사이즈 함수 */
function resize(){
  const stageEl=document.getElementById('stage');
  if(!stageEl) return;
  const box=stageEl.getBoundingClientRect();
  DPR=Math.min(window.devicePixelRatio||1,2.5);
  W=Math.max(1,box.width); H=Math.max(1,box.height);
  cv.width=W*DPR; cv.height=H*DPR;
  ctx.setTransform(DPR,0,0,DPR,0,0);

  // 2단 스테이지 영역 안에서의 완벽한 배경 스케일 계산
  const scale=Math.min(box.width/BG_IMG_W, box.height/BG_IMG_H);
  const imgW=BG_IMG_W*scale, imgH=BG_IMG_H*scale;
  const imgOffX=(box.width-imgW)/2;
  const imgOffY=(box.height-imgH)/2;

  // 캔버스 좌표계
  const bgX=fx=>imgOffX+fx*imgW;
  const bgY=fy=>imgOffY+fy*imgH;

  // 점수판 위치를 두루마리 그림에 찰떡같이 고정
  const scrollEl=document.getElementById('scoreScroll');
  if(scrollEl){
    const sL=imgOffX+0.3111*imgW, sR=imgOffX+0.7111*imgW;
    const sT=0.0350*imgH, sB=0.1240*imgH;
    scrollEl.style.left=sL+'px'; scrollEl.style.top=(imgOffY+sT)+'px';
    scrollEl.style.width=(sR-sL)+'px'; scrollEl.style.height=(sB-sT)+'px';
    scrollEl.style.fontSize=Math.max(14,(sB-sT)*0.42)+'px';
  }

  BX=bgX(BG_FRAME.left); const bxRight=bgX(BG_FRAME.right);
  BW=bxRight-BX;
  R=BW/(COLS*2);
  const Rmax=Math.min(H*0.052, 46);
  if(R>Rmax){ R=Rmax; BW=R*COLS*2; BX=bgX(BG_FRAME.left)+((bxRight-bgX(BG_FRAME.left))-BW)/2; }
  ROWH=R*1.72;
  BY=Math.max(6+FRAME, bgY(BG_FRAME.top));

  // 대포 위치 돌판에 고정
  G.shooterY=bgY(0.815);

  BH=G.shooterY-BY;
  G.maxRows=Math.max(6,Math.floor((BH-R*2)/ROWH)+1);
  BOARDLAYER=null; SPR.clear(); G.trajA=null;
}

let _rz;
function onResize(){ clearTimeout(_rz); _rz=setTimeout(()=>{ resize(); },120); }
window.addEventListener('resize',onResize);
window.addEventListener('orientationchange',onResize);
if(window.visualViewport) window.visualViewport.addEventListener('resize',onResize);

/* ---------- 상태 및 파티클 최적화 (Object Pooling) ---------- */
const G={
  grid:[],parity:0,stage:1,score:0,combo:0,started:false,
  mode:'theme',goal:'과일',pool:[],words:[],targets:[],done:{},
  cur:null,queue:[],
  fly:null,aim:null,dragging:false,
  toasts:[],waves:[],pops:[],shake:0,flash:0,
  shooterY:0,maxRows:10,
  dryShots:0,swaps:3,hints:3,hintCells:null,bombs:2,rainbows:2,activeItem:null,
  wordsCompleted:0,freeGoal:8,
  locked:true,shots:0,trajA:null,trajPts:[],banner:null
};

const MAX_PARTICLES = 150;
const PARTICLE_POOL = Array.from({length: MAX_PARTICLES}, () => ({active: false, x:0, y:0, vx:0, vy:0, life:0, col:'#000', r:0}));
function getParticle() {
  for(let i=0; i<MAX_PARTICLES; i++) if(!PARTICLE_POOL[i].active) return PARTICLE_POOL[i];
  return null;
}

const po=r=>(r+G.parity)&1;
const cellsIn=r=>po(r)===0?COLS:COLS-1;
const cx=(c,r)=>BX+R+c*2*R+(po(r)?R:0);
const cy=r=>BY+R+r*ROWH;

function nbrs(c,r){const o=po(r);
  return [[c-1,r],[c+1,r],[c-1+o,r-1],[c+o,r-1],[c-1+o,r+1],[c+o,r+1]];}
function at(c,r){
  if(r<0||r>=G.grid.length)return null;
  if(c<0||c>=cellsIn(r))return null;
  return G.grid[r][c];
}
const AXES=[
  {fwd:(c,r)=>[c+1,r],         back:(c,r)=>[c-1,r]},
  {fwd:(c,r)=>[c+po(r),r+1],   back:(c,r)=>[c-1+po(r),r-1]},
  {fwd:(c,r)=>[c-1+po(r),r+1], back:(c,r)=>[c+po(r),r-1]}
];

/* ---------- 스테이지 ---------- */
function buildFreeStage(){
  G.waves=[]; G.pops=[]; G.shake=0; G.flash=0;
  PARTICLE_POOL.forEach(p => p.active = false);
  G.goal='자유';
  const cats=shuffle([...CATS]);
  G.words=cats.flatMap(c=>shuffle(DICT_BY_CAT[c]).slice(0,14));
  if(Math.random()<0.6){ const b=shuffle(BONUS_WORDS); G.words.push(...b.slice(0,3)); }
  G.words.push(...shuffle(GENERIC_WORDS).slice(0,16));
  const syl=new Set(); for(const w of G.words) for(const ch of w) syl.add(ch);
  G.pool=[...syl]; mapColors(G.pool);
  G.targets=[]; G.done={};
  G.wordsCompleted=0; G.freeGoal=6+Math.floor((G.stage-1)*1.5);
  const rows=Math.min(G.maxRows,4);
  G.parity=0; G.grid=[]; resetFillCount();
  for(let r=0;r<rows;r++){
    const row=[];
    G.grid.push(row);
    for(let c=0;c<cellsIn(r);c++) row.push({s:fillSyllable(c,r),col:randCol()});
  }
  for(let i=0;i<3;i++) plantWord(pick(G.words.filter(w=>w.length<=3)),rows);
  sprinkleSpecials();
  G.cur=newCur(); G.queue=[newCur(),newCur()];
  G.combo=0;G.dryShots=0;G.shots=0;G.hintCells=null;G.swaps=3;G.hints=3;G.bombs=2;G.rainbows=2;G.activeItem=null;
  syncUI();
}
function buildStage(){
  G.waves=[]; G.pops=[]; G.shake=0; G.flash=0;
  PARTICLE_POOL.forEach(p => p.active = false);
  if(G.mode==='free'){ buildFreeStage(); return; }
  G.goal=CATS[(G.stage-1)%CATS.length];
  const nTarget=Math.min(5,3+Math.floor((G.stage-1)/2));
  const catWords=DICT_BY_CAT[G.goal];
  const short=shuffle(catWords.filter(w=>w.length===2));
  const long=shuffle(catWords.filter(w=>w.length>=3));
  const bonus=shuffle(BONUS_WORDS.filter(w=>DICT_BY_CAT[G.goal].some(x=>w.includes(x))));
  let pickPool=[...short];
  if(G.stage>=3) pickPool=[...short.slice(0,3),...long];
  if(G.stage>=5 && bonus.length) pickPool.push(bonus[0]);
  G.targets=shuffle(pickPool).slice(0,nTarget);
  if(G.targets.length<nTarget) G.targets=[...G.targets,...shuffle(catWords).slice(0,nTarget-G.targets.length)];
  G.done={}; G.targets.forEach(w=>G.done[w]=false);

  const main=shuffle(DICT_BY_CAT[G.goal]).slice(0,7);
  const others=shuffle(CATS.filter(c=>c!==G.goal)).slice(0,2)
    .flatMap(c=>shuffle(DICT_BY_CAT[c]).slice(0,3));
  G.words=[...new Set([...G.targets,...main,...others])];
  const syl=new Set(); for(const w of G.words) for(const ch of w) syl.add(ch);
  G.pool=[...syl];
  mapColors(G.pool);

  const rows=Math.min(G.maxRows, Math.max(2, 2+Math.floor((G.stage-1)/2)));
  G.parity=0; G.grid=[]; resetFillCount();
  for(let r=0;r<rows;r++){
    const row=[];
    G.grid.push(row);
    for(let c=0;c<cellsIn(r);c++) row.push({s:fillSyllable(c,r),col:randCol()});
  }
  const seeds=shuffle(G.targets.filter(w=>w.length<=3));
  for(let i=0;i<Math.min(2,seeds.length);i++) plantWord(seeds[i],rows);
  plantWord(pick(main),rows);
  sprinkleSpecials();

  G.cur=newCur(); G.queue=[newCur(),newCur()];
  G.combo=0;G.dryShots=0;G.shots=0;G.hintCells=null;G.swaps=3;G.hints=3;G.bombs=2;G.rainbows=2;G.activeItem=null;
  syncUI();
}
function sprinkleSpecials(){
  const all=[];
  for(let r=0;r<G.grid.length;r++)
    for(let c=0;c<cellsIn(r);c++)
      if(at(c,r) && !G.grid[r][c].special) all.push([c,r]);
  shuffle(all);
  const nGold=1+Math.floor(Math.random()*2);
  const nBomb=Math.random()<0.6?1:0;
  let idx=0;
  for(let i=0;i<nGold && idx<all.length;i++,idx++){ const [c,r]=all[idx]; G.grid[r][c].special='gold'; }
  for(let i=0;i<nBomb && idx<all.length;i++,idx++){ const [c,r]=all[idx]; G.grid[r][c].special='bomb'; }
}
function plantWord(w,rows){
  for(let t=0;t<40;t++){
    const ax=AXES[Math.floor(Math.random()*3)];
    let c=Math.floor(Math.random()*COLS),r=Math.floor(Math.random()*rows);
    if(!at(c,r))continue;
    const cells=[[c,r]]; let ok=true;
    for(let i=1;i<w.length;i++){
      [c,r]=ax.fwd(c,r);
      if(!at(c,r)){ok=false;break;}
      cells.push([c,r]);
    }
    if(!ok)continue;
    cells.forEach(([cc,rr],i)=>{G.grid[rr][cc].s=w[i];});
    const gap=Math.floor(Math.random()*w.length);
    const alt=G.pool.filter(s=>s!==w[gap]);
    if(alt.length) G.grid[cells[gap][1]][cells[gap][0]].s=pick(alt);
    return;
  }
}

/* ---------- 단어 판정 ---------- */
function lineOf(c0,r0,ax){
  const cells=[[c0,r0]]; let c=c0,r=r0;
  for(;;){[c,r]=ax.back(c,r); if(!at(c,r))break; cells.unshift([c,r]);}
  c=c0;r=r0;
  for(;;){[c,r]=ax.fwd(c,r); if(!at(c,r))break; cells.push([c,r]);}
  return cells;
}
function findWord(c0,r0,s){
  const cands=[];
  for(const ax of AXES){
    const cells=lineOf(c0,r0,ax);
    const str=cells.map(([c,r])=>(c===c0&&r===r0)?s:at(c,r).s).join('');
    const idx=cells.findIndex(([c,r])=>c===c0&&r===r0);
    for(let len=Math.min(MAXW,str.length);len>=2;len--){
      for(let st=Math.max(0,idx-len+1);st<=Math.min(idx,str.length-len);st++){
        const w=str.substr(st,len);
        if(DICT.has(w)){
          cands.push({word:w,cells:cells.slice(st,st+len),cat:DICT.get(w)});
        }else{
          const rw=[...w].reverse().join('');
          if(rw!==w && DICT.has(rw)){
            cands.push({word:rw,cells:cells.slice(st,st+len),cat:DICT.get(rw)});
          }
        }
      }
    }
  }
  if(!cands.length) return null;
  if(G.mode==='theme'){
    const targetHit=cands.filter(c=>c.word in G.done && !G.done[c.word]);
    if(targetHit.length){ targetHit.sort((a,b)=>b.word.length-a.word.length); return targetHit[0]; }
  }
  cands.sort((a,b)=>b.word.length-a.word.length);
  return cands[0];
}
function openCells(){
  const out=[],seen=new Set();
  for(let r=0;r<G.grid.length;r++)
    for(let c=0;c<cellsIn(r);c++){
      if(!at(c,r))continue;
      for(const [nc,nr] of nbrs(c,r)){
        if(nr<0||nr>=G.maxRows)continue;
        if(nc<0||nc>=cellsIn(nr))continue;
        if(nr<G.grid.length&&G.grid[nr][nc])continue;
        const k=nc+','+nr; if(seen.has(k))continue;
        seen.add(k); out.push([nc,nr]);
      }
    }
  return out;
}
function completionsFor(s){
  const res=[];
  for(const [c,r] of openCells()){
    const w=findWord(c,r,s);
    if(w)res.push({c,r,...w});
  }
  return res;
}
let _recentSyl=[];
function _notRecent(list){
  const fresh=list.filter(s=>!_recentSyl.includes(s));
  return fresh.length?fresh:list;
}
function newCur(){ return {s:smartSyllable(), col:randCol()}; }
function smartSyllable(){
  let chosen=null;
  if(Math.random()<0.78){
    const targetC=[];
    const anyC=[];
    for(const s of G.pool){
      const hit=completionsFor(s);
      if(!hit.length) continue;
      anyC.push(s);
      if(G.mode==='theme' && hit.some(h=>h.word in G.done && !G.done[h.word])) targetC.push(s);
    }
    let pool2;
    if(G.mode==='theme' && targetC.length){
      pool2 = (Math.random()<0.66) ? targetC : (anyC.length?anyC:targetC);
    }else{
      pool2 = anyC;
    }
    if(pool2.length) chosen=pick(_notRecent(pool2));
  }
  if(!chosen) chosen=pick(_notRecent(G.pool));
  _recentSyl.push(chosen); if(_recentSyl.length>3) _recentSyl.shift();
  return chosen;
}
function ensureRow(r){
  while(G.grid.length<=r) G.grid.push(new Array(cellsIn(G.grid.length)).fill(null));
}

/* ---------- 발사 ---------- */
function shoot(angle){
  if(G.fly||G.locked)return;
  const sp=R*0.62;
  const item=G.activeItem;
  if(item==='bomb') G.bombs--;
  if(item==='rainbow') G.rainbows--;
  G.activeItem=null;
  const p0=pipePos();
  G.fly={x:p0.x,y:p0.y,vx:Math.cos(angle)*sp,vy:Math.sin(angle)*sp,s:G.cur.s,col:G.cur.col,item};
  G.cur=G.queue.shift(); G.queue.push(newCur());
  G.hintCells=null; G.trajA=null; G.shots++; syncUI();
}
function hitsBubble(x,y){
  for(let r=0;r<G.grid.length;r++)
    for(let c=0;c<cellsIn(r);c++){
      if(!at(c,r))continue;
      const dx=x-cx(c,r),dy=y-cy(r);
      if(dx*dx+dy*dy<(R*1.82)*(R*1.82))return true;
    }
  return false;
}
function stepFly(){
  const f=G.fly; if(!f)return;
  const steps=6;
  for(let i=0;i<steps;i++){
    f.x+=f.vx/steps; f.y+=f.vy/steps;
    if(f.y<BY+BH){
      if(f.x<BX+R){f.x=BX+R;f.vx*=-1;}
      if(f.x>BX+BW-R){f.x=BX+BW-R;f.vx*=-1;}
    }
    if(f.y<=BY+R){settle(f);return;}
    if(f.y<BY+BH && hitsBubble(f.x,f.y)){settle(f);return;}
  }
}
function bestSyllableAt(c,r){
  let best=null;
  for(const s of G.pool){
    const hit=findWord(c,r,s);
    if(hit && (!best || hit.word.length>best.word.length)) best={s,...hit};
  }
  return best;
}
function explodeAt(c,r){
  const cells=[[c,r],...nbrs(c,r).filter(([nc,nr])=>at(nc,nr))];
  G.locked=true;
  const t0=performance.now();
  cells.forEach(([cc,rr])=>{ if(G.grid[rr]&&G.grid[rr][cc]) G.grid[rr][cc].glow=t0; });
  setTimeout(()=>{
    let n=0;
    for(const [cc,rr] of cells){
      if(!G.grid[rr]||!G.grid[rr][cc])continue;
      const col=colorOf(G.grid[rr][cc])[0];
      burst(cx(cc,rr),cy(rr),col);
      addWave(cx(cc,rr),cy(rr),col,R*3);
      G.grid[rr][cc]=null; n++;
    }
    addShake(10); flash(0.22);
    G.score += n*80;
    G.combo=0; G.dryShots=0;
    toast('펑! +'+(n*80));
    dropFloaters(); G.locked=false; checkState(); syncUI();
  },260);
}
function settle(f){
  let best=null,bd=1e9;
  for(const [c,r] of openCells()){
    const d=(f.x-cx(c,r))**2+(f.y-cy(r))**2;
    if(d<bd){bd=d;best=[c,r];}
  }
  if(!best){
    ensureRow(0);
    for(let c=0;c<cellsIn(0);c++){
      if(G.grid[0][c])continue;
      const d=(f.x-cx(c,0))**2+(f.y-cy(0))**2;
      if(d<bd){bd=d;best=[c,0];}
    }
  }
  G.fly=null; if(!best)return;
  const [c,r]=best; ensureRow(r);
  if(f.item==='bomb'){
    G.grid[r][c]={s:f.s,col:f.col,born:performance.now()};
    SFX.stageClear();
    explodeAt(c,r);
    return;
  }
  let s=f.s;
  if(f.item==='rainbow'){
    const b=bestSyllableAt(c,r);
    if(b) s=b.s;
  }
  G.grid[r][c]={s,col:f.col,born:performance.now()};
  addShake(1.5); addWave(cx(c,r),cy(r),colorOf(G.grid[r][c])[0],R*1.4);
  resolve(c,r);
}
function wordScore(len,combo){
  const base=[0,0,200,600,1600,3200][Math.min(len,5)]||3200;
  return base*Math.max(1,combo);
}
function findWordAt(c0,r0){
  const b0=at(c0,r0); if(!b0)return null;
  let best=null;
  const dfs=(c,r,str,path,visited)=>{
    if(str.length>=2){
      const rev=[...str].reverse().join('');
      let hit=DICT.has(str)?str:(DICT.has(rev)?rev:null);
      if(hit && (!best||hit.length>best.word.length)) best={word:hit,cells:path.slice(),cat:DICT.get(hit)};
    }
    if(str.length>=MAXW)return; // ✨ 5글자 단어도 완성되도록 버그 수정!
    for(const [nc,nr] of nbrs(c,r)){
      const k=nc+','+nr; if(visited.has(k))continue;
      const b=at(nc,nr); if(!b)continue;
      visited.add(k); path.push([nc,nr]);
      dfs(nc,nr,str+b.s,path,visited);
      path.pop(); visited.delete(k);
    }
  };
  dfs(c0,r0,b0.s,[[c0,r0]],new Set([c0+','+r0]));
  return best;
}
function floodMatch(c0,r0,key){
  const b0=at(c0,r0); if(!b0)return [];
  const target=key==='col'?b0.col:b0.s;
  const seen=new Set(),stack=[[c0,r0]],out=[];
  while(stack.length){
    const [c,r]=stack.pop(); const k=c+','+r;
    if(seen.has(k))continue; seen.add(k);
    const b=at(c,r); if(!b)continue;
    const v=key==='col'?b.col:b.s;
    if(v!==target)continue;
    out.push([c,r]);
    for(const [nc,nr] of nbrs(c,r)) stack.push([nc,nr]);
  }
  return out;
}
function clearCells(cells){
  const t0=performance.now();
  for(const [cc,rr] of cells) if(G.grid[rr]&&G.grid[rr][cc]) G.grid[rr][cc].glow=t0;
}
function resolve(c,r){
  const word=findWordAt(c,r);
  if(word){
    G.combo++; G.dryShots=0; G.wordsCompleted++;
    if(word.word in G.done && !G.done[word.word]) {
      G.done[word.word]=true;
      const tBar = document.getElementById('targetBar');
      if(tBar) {
        const chips = tBar.querySelectorAll('.tchip');
        chips.forEach(chip => {
          if(chip.textContent.replace('✓ ','').trim() === word.word) {
            chip.style.transform = 'scale(1.25)';
            chip.style.boxShadow = '0 0 20px #7ba05b';
            chip.style.zIndex = '10';
            setTimeout(() => { chip.style.transform = ''; chip.style.boxShadow = ''; chip.style.zIndex = ''; }, 400);
          }
        });
      }
    }
    const combo=Math.min(G.combo,5);
    const pts=wordScore(word.word.length, combo);
    G.score+=pts;
    SAVE.coins=(SAVE.coins||0)+Math.max(3,word.word.length*2);
    G.banner={text:word.word,life:1,bonus:true};
    SFX.wordComplete(G.combo,true);
    flash(0.3+Math.min(word.word.length,4)*0.05); addShake(8+word.word.length*2);
    let px=word.cells.reduce((a,[c,r])=>a+cx(c,r),0)/word.cells.length;
    let py=word.cells.reduce((a,[c,r])=>a+cy(r),0)/word.cells.length;
    addPop(px,py,'✨ +'+pts,'#ffe08c');
    if(combo>=2) addPop(px,py-R*0.9,'콤보 x'+combo,'#ff9fd6');
    G.locked=true;
    clearCells(word.cells);
    word.cells.forEach(([cc,rr],i)=>{
      setTimeout(()=>{ addWave(cx(cc,rr),cy(rr),'#ffe08c',R*3); if(i>0)SFX.pop(); },i*70);
    });
    if(word.word.length>=4){
      for(let i=0;i<20;i++){
        const p = getParticle();
        if(p) {
          const ang=Math.random()*Math.PI*2, sp=1+Math.random()*4;
          p.active=true; p.x=W/2; p.y=H*0.4; p.vx=Math.cos(ang)*sp; p.vy=Math.sin(ang)*sp; 
          p.life=1.4; p.col='#ffe08c'; p.r=2+Math.random()*3;
        }
      }
      G.banner={text:word.word,life:1.6,bonus:true,big:true};
    }
    setTimeout(()=>{
      let goldHit=0; const bombCells=[];
      for(const [cc,rr] of word.cells){
        if(!G.grid[rr]||!G.grid[rr][cc])continue;
        const sp=G.grid[rr][cc].special;
        if(sp==='gold')goldHit++;
        if(sp==='bomb')bombCells.push([cc,rr]);
        burst(cx(cc,rr),cy(rr),'#ffe08c');
        G.grid[rr][cc]=null;
      }
      let chain=0;
      for(const [wc,wr] of word.cells)
        for(const [nc,nr] of nbrs(wc,wr))
          if(G.grid[nr]&&G.grid[nr][nc]){ burst(cx(nc,nr),cy(nr),colorOf(G.grid[nr][nc])[0]); G.grid[nr][nc]=null; chain++; }
      G.score+=chain*30;
      if(goldHit){ const gb=goldHit*300; G.score+=gb; SAVE.coins=(SAVE.coins||0)+goldHit*10;
        addPop(px,py-R*1.6,'✨ 황금 +'+gb,'#ffe08c'); flash(0.2); }
      for(const [bc,br] of bombCells){
        for(const [nc,nr] of nbrs(bc,br)) if(G.grid[nr]&&G.grid[nr][nc]){ burst(cx(nc,nr),cy(nr),colorOf(G.grid[nr][nc])[0]); G.grid[nr][nc]=null; G.score+=60; }
        addWave(cx(bc,br),cy(br),'#ff9a5c',R*3); addShake(8);
      }
      dropFloaters(); G.locked=false; checkState(); syncUI();
    },420);
    syncUI(); return;
  }
  const colGroup=floodMatch(c,r,'col');
  const sylGroup=floodMatch(c,r,'syl');
  let group=[], mtype='';
  if(colGroup.length>=3 && colGroup.length>=sylGroup.length){ group=colGroup; mtype='col'; }
  else if(sylGroup.length>=3){ group=sylGroup; mtype='syl'; }
  if(group.length>=3){
    G.combo++; G.dryShots=0;
    const combo=Math.min(G.combo,5);
    const typeMul=mtype==='syl'?1.5:1;
    let pts=Math.round(group.length*12*combo*typeMul);
    G.score+=pts;
    SAVE.coins=(SAVE.coins||0)+Math.floor(group.length/2);
    SFX.pop();
    if(mtype==='syl'){ G.banner={text:'"'+at(c,r).s+'" ×'+group.length,life:1}; flash(0.15); addShake(6); }
    else{ addShake(3+combo); if(combo>=3)flash(0.12); }
    let px=group.reduce((a,[c,r])=>a+cx(c,r),0)/group.length;
    let py=group.reduce((a,[c,r])=>a+cy(r),0)/group.length;
    addPop(px,py,'+'+pts,'#fff6d0');
    if(combo>=2) addPop(px,py-R*0.9,'콤보 x'+combo,'#ff9fd6');
    G.locked=true;
    clearCells(group);
    setTimeout(()=>{
      for(const [cc,rr] of group){
        if(!G.grid[rr]||!G.grid[rr][cc])continue;
        burst(cx(cc,rr),cy(rr),colorOf(G.grid[rr][cc])[0]);
        addWave(cx(cc,rr),cy(rr),colorOf(G.grid[rr][cc])[0]);
        G.grid[rr][cc]=null;
      }
      dropFloaters(); G.locked=false; checkState(); syncUI();
    },300);
    syncUI(); return;
  }
  G.combo=0; G.dryShots++;
  SFX.miss();
  if(G.grid[r]&&G.grid[r][c]) G.grid[r][c].nope=performance.now();
  addShake(2);
  const left=5-G.dryShots;
  if(left>0 && left<=2) addPop(cx(c,r), cy(r)+R*0.7, left+'번 더 실패 시 새 줄', '#ffb15c');
  if(G.dryShots>=5){G.dryShots=0;addRow();}
  checkState();
  syncUI();
}
function dropFloaters(){
  const keep=new Set(),stack=[];
  if(G.grid[0])for(let c=0;c<cellsIn(0);c++) if(G.grid[0][c]){keep.add('0,'+c);stack.push([c,0]);}
  while(stack.length){
    const [c,r]=stack.pop();
    for(const [nc,nr] of nbrs(c,r)){
      if(!at(nc,nr))continue;
      const k=nr+','+nc; if(keep.has(k))continue;
      keep.add(k); stack.push([nc,nr]);
    }
  }
  for(let r=0;r<G.grid.length;r++)
    for(let c=0;c<cellsIn(r);c++){
      if(!at(c,r))continue;
      if(!keep.has(r+','+c)){
        burst(cx(c,r),cy(r),colorOf(G.grid[r][c])[0]);
        G.score+=50; G.grid[r][c]=null;
      }
    }
}
function addRow(){
  SFX.rowAdd();
  G.parity^=1;
  const row=[];
  for(let c=0;c<cellsIn(0);c++){
    const avoid=c>0?row[c-1].s:null;
    let cand=G.pool.filter(x=>x!==avoid); if(!cand.length)cand=[...G.pool];
    let mn=Infinity; for(const x of cand) mn=Math.min(mn,_fillCount[x]||0);
    const least=cand.filter(x=>(_fillCount[x]||0)<=mn+1);
    const ch=pick(least.length?least:cand); _fillCount[ch]=(_fillCount[ch]||0)+1;
    row.push({s:ch,col:randCol()});
  }
  G.grid.unshift(row);
  toast('새 줄이 내려왔어요!');
}
function checkState(){
  let count=0,lowest=-1;
  for(let r=0;r<G.grid.length;r++)
    for(let c=0;c<cellsIn(r);c++)
      if(at(c,r)){count++;lowest=Math.max(lowest,r);}
  if(count===0){win();return;}
  if(G.mode==='theme'){
    const allDone=G.targets.length && G.targets.every(w=>G.done[w]);
    if(allDone){win();return;}
  }else if(G.mode==='free'){
    if(G.wordsCompleted>=G.freeGoal){win();return;}
  }
  if(cy(lowest)+R>BY+BH) lose();
}

/* ---------- 이펙트 ---------- */
function addShake(amt){ G.shake=Math.min(G.shake+amt, 14); }
function addWave(x,y,col,maxR){ G.waves.push({x,y,col,r:R*0.3,maxR:maxR||R*2.4,life:1}); }
function addPop(x,y,text,col){ G.pops.push({x,y,text,col:col||'#fff6d0',life:1,vy:-1.2}); }
function flash(a){ G.flash=Math.max(G.flash,a); }
function burst(x,y,col){
  for(let i=0;i<14;i++){
    const p = getParticle();
    if(!p) continue;
    const a=Math.random()*Math.PI*2,sp=1+Math.random()*4.5;
    p.active=true; p.x=x; p.y=y; p.vx=Math.cos(a)*sp; p.vy=Math.sin(a)*sp-1; p.life=1; p.col=col; p.r=2+Math.random()*4;
  }
  blip();
}
function toast(text,cells){
  let x=W/2,y=H*0.34;
  if(cells&&cells.length){
    x=cells.reduce((a,[c,r])=>a+cx(c,r),0)/cells.length;
    y=cells.reduce((a,[c,r])=>a+cy(r),0)/cells.length;
  }
  G.toasts.push({text,x,y,life:1});
}
let actx=null;
function getActx(){
  try{ actx=actx||new (window.AudioContext||window.webkitAudioContext)(); return actx; }catch(e){ return null; }
}
function soundOn(){ return SAVE.soundOn!==false; }
function tone(freq0,freq1,dur,gain,type,delay){
  if(!soundOn())return;
  const ax=getActx(); if(!ax)return;
  try{
    const t0=ax.currentTime+(delay||0);
    const o=ax.createOscillator(),g=ax.createGain();
    o.type=type||'triangle';
    o.frequency.setValueAtTime(freq0,t0);
    if(freq1) o.frequency.exponentialRampToValueAtTime(freq1,t0+dur*0.55);
    g.gain.setValueAtTime(0.0001,t0);
    g.gain.exponentialRampToValueAtTime(gain,t0+0.015);
    g.gain.exponentialRampToValueAtTime(0.0001,t0+dur);
    o.connect(g); g.connect(ax.destination);
    o.start(t0); o.stop(t0+dur+0.02);
  }catch(e){}
}
const SFX={
  pop(){ tone(520+Math.random()*260,880,0.17,0.07,'triangle'); },
  click(){ tone(700,900,0.06,0.05,'square'); },
  wordComplete(combo,bonus){
    const base=440+Math.min(combo,5)*40;
    const ratios=bonus?[1,1.26,1.5,2]:[1,1.26,1.5];
    ratios.forEach((r,i)=>tone(base*r,base*r*1.15,0.22,0.09,'triangle',i*0.045));
  },
  miss(){ tone(260,180,0.14,0.045,'sine'); },
  rowAdd(){ tone(180,120,0.3,0.06,'sawtooth'); },
  stageClear(){
    [0,1,2,3].forEach(i=>tone(523.25*Math.pow(2,i/12*4), null, 0.28,0.08,'triangle',i*0.11));
  },
  gameOver(){ tone(300,90,0.6,0.08,'sawtooth'); },
  buy(){ tone(700,1100,0.14,0.07,'triangle'); tone(1050,1400,0.16,0.06,'triangle',0.06); }
};
function blip(){ SFX.pop(); }

/* ---------- 에셋 ---------- */
const GEM_NAMES=['jade','ruby','turquoise','amber','amethyst','onyx'];
const ASSET_SRC={ scene:'assets/scene.svg', cannon:'assets/cannon.png',
  gem0:'assets/gem_jade.png', gem1:'assets/gem_ruby.png', gem2:'assets/gem_turquoise.png',
  gem3:'assets/gem_amber.png', gem4:'assets/gem_amethyst.png', gem5:'assets/gem_onyx.png' };
const ASSETS={};
function loadAssets(){
  return Promise.all(Object.entries(ASSET_SRC).map(([k,src])=>new Promise(res=>{
    const i=new Image();
    i.onload=()=>{ASSETS[k]=i;res();};
    i.onerror=()=>{console.warn('asset 로드 실패:',k);res();};
    i.src=src;
  })));
}

/* ---------- 드로잉 ---------- */
function roundRect(x,y,w,h,r){
  ctx.beginPath();ctx.moveTo(x+r,y);
  ctx.arcTo(x+w,y,x+w,y+h,r); ctx.arcTo(x+w,y+h,x,y+h,r);
  ctx.arcTo(x,y+h,x,y,r); ctx.arcTo(x,y,x+w,y,r); ctx.closePath();
}
function neon(col,blur,w,fn){
  ctx.save();
  ctx.strokeStyle=col; ctx.lineWidth=w; ctx.lineCap='round'; ctx.lineJoin='round';
  ctx.shadowColor=col; ctx.shadowBlur=blur*1.6; fn();
  ctx.shadowBlur=blur*.7; fn();
  ctx.restore();
}
function drawBubbleRaw(x,y,r,s,col,glow,special){
  let [c1,c2]=colByIdx(col||0);
  if(special==='gold'){ c1='#ffe9a8'; c2='#c8962f'; }
  else if(special==='bomb'){ c1='#e8a878'; c2='#a85f2f'; }
  const rr=r*.94;
  const gemImg = (special==='gold') ? ASSETS.gem3 : (special==='bomb' ? ASSETS.gem1 : ASSETS['gem'+((col||0)%6)]);

  if(gemImg){
    ctx.save();
    ctx.beginPath(); ctx.arc(x,y,rr,0,7); ctx.clip();
    ctx.drawImage(gemImg, x-rr, y-rr, rr*2, rr*2);
    if(special==='gold'){ ctx.fillStyle='rgba(255,224,140,.28)'; ctx.fillRect(x-rr,y-rr,rr*2,rr*2); }
    ctx.restore();
  }else{
    ctx.save();
    ctx.beginPath(); ctx.arc(x,y,rr,0,7); ctx.clip();
    const g=ctx.createRadialGradient(x-rr*.32,y-rr*.38,rr*.12, x,y,rr*1.15);
    g.addColorStop(0, lighten(c1,18));
    g.addColorStop(.45, c1);
    g.addColorStop(1, c2);
    ctx.fillStyle=g;
    ctx.fillRect(x-rr,y-rr,rr*2,rr*2);
    ctx.restore();
  }

  ctx.save();
  ctx.beginPath(); ctx.arc(x,y,rr,0,7);
  ctx.strokeStyle= glow ? '#fff0c0' : '#c9a04a';
  ctx.lineWidth=Math.max(1.2,r*.055);
  ctx.globalAlpha=.85;
  ctx.stroke();
  ctx.restore();
  if(glow){
    ctx.save();
    ctx.beginPath(); ctx.arc(x,y,rr,0,7);
    ctx.strokeStyle='#ffe9a0'; ctx.shadowColor='#ffd86f'; ctx.shadowBlur=r*.5;
    ctx.lineWidth=Math.max(1.2,r*.04); ctx.stroke();
    ctx.restore();
  }

  ctx.save();
  ctx.font=`800 ${r*1.0}px 'Pretendard', sans-serif`;
  ctx.textAlign='center';ctx.textBaseline='middle';
  const ty=y+r*.06;
  ctx.shadowColor='rgba(40,24,10,.55)'; ctx.shadowBlur=r*.14; ctx.shadowOffsetY=r*.07;
  ctx.fillStyle='#fffaf0'; ctx.fillText(s,x,ty);
  ctx.shadowColor='transparent'; ctx.shadowBlur=0; ctx.shadowOffsetY=0;
  if(special==='gold'){
    ctx.strokeStyle='#fff3b0'; ctx.lineWidth=r*.09; ctx.shadowColor='#ffe08c'; ctx.shadowBlur=r*.6;
    ctx.beginPath(); ctx.arc(x,y,rr,0,7); ctx.stroke();
    ctx.shadowBlur=0;
    ctx.fillStyle='#fff8d8';
    [[0.5,-0.7],[-0.6,0.4],[0.7,0.5],[-0.4,-0.5]].forEach(([dx,dy],i)=>{
      const s2=r*0.10*(0.7+0.5*Math.sin(performance.now()/200+i));
      ctx.beginPath(); ctx.arc(x+dx*r*.7,y+dy*r*.7,s2,0,7); ctx.fill();
    });
  }else if(special==='bomb'){
    ctx.font=`${r*.55}px sans-serif`; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText('💣', x+r*.5, y-r*.5);
  }
  ctx.restore();
}
function lighten(hex,amt){
  const n=parseInt(hex.slice(1),16);
  let r=(n>>16)&255, g=(n>>8)&255, b=n&255;
  r=Math.min(255,r+amt*2); g=Math.min(255,g+amt*2); b=Math.min(255,b+amt*2);
  return `rgb(${r|0},${g|0},${b|0})`;
}
const SPR=new Map();
let FONTS_READY=false;
function sprite(s,r,glow,col){
  const key=s+'|'+r+'|'+(glow?1:0)+'|'+(col||0);
  let c=SPR.get(key); if(c)return c;
  const pad=Math.ceil(r*(glow?2.0:1.55)), size=pad*2;
  c=document.createElement('canvas');
  c.width=Math.ceil(size*DPR); c.height=Math.ceil(size*DPR);
  const g2=c.getContext('2d'); g2.setTransform(DPR,0,0,DPR,0,0);
  const keep=ctx; ctx=g2; drawBubbleRaw(pad,pad,r,s,col,glow); ctx=keep;
  c._pad=pad;
  if(FONTS_READY){ if(SPR.size>320)SPR.clear(); SPR.set(key,c); }
  return c;
}
function bubble(x,y,r,s,col,glow,special){
  if(special){ drawBubbleRaw(x,y,r,s,col,glow,special); return; }
  r=Math.round(r*2)/2;
  const c=sprite(s,r,glow,col);
  ctx.drawImage(c,x-c._pad,y-c._pad,c._pad*2,c._pad*2);
}

function drawScenery(){
  const img=ASSETS.scene; if(!img)return;
  ctx.save();
  roundRect(BX,BY,BW,BH,26); ctx.clip();
  const w=BW*1.04, h=w*(img.height/img.width);
  ctx.drawImage(img, BX-BW*.02, BY+BH-h+R*.15, w, h);
  ctx.restore();
}
let BOARDLAYER=null;
function drawBoard(){
  if(!BOARDLAYER){
    const c=document.createElement('canvas');
    c.width=Math.ceil(W*DPR); c.height=Math.ceil(H*DPR);
    const g2=c.getContext('2d'); g2.setTransform(DPR,0,0,DPR,0,0);
    const keep=ctx; ctx=g2; drawBoardRaw(); ctx=keep;
    BOARDLAYER=c;
  }
  ctx.drawImage(BOARDLAYER,0,0,W,H);
}
function drawBoardRaw(){
  const x=BX-FRAME,y=BY-FRAME,w=BW+FRAME*2,h=BH+FRAME*2;
  ctx.save();
  roundRect(x,y,w,h,24);
  ctx.fillStyle='rgba(20,12,6,.16)';ctx.fill();
  ctx.restore();
}
const CANNON_W=4.8, CANNON_OFF=0.0;
const PIPE_X_RATIO=0.52, PIPE_Y_RATIO=-0.05;
function pipePos(){
  const cx0=W/2, sy=G.shooterY;
  const img=ASSETS.cannon;
  if(!img) return {x:cx0,y:sy};
  const w=R*CANNON_W, h=w*(img.height/img.width);
  const ix=cx0-w/2, iy=sy+R*CANNON_OFF;
  return {x: ix+w*PIPE_X_RATIO, y: iy+h*PIPE_Y_RATIO};
}
function drawShooter(now){
  const img=ASSETS.cannon, sy=G.shooterY, cx0=W/2;
  const p=pipePos(); const pipeX=p.x, pipeY=p.y;
  if(img){
    const w=R*CANNON_W, h=w*(img.height/img.width);
    ctx.drawImage(img, cx0-w/2, sy+R*CANNON_OFF, w, h);
  }
  if(!G.fly&&G.cur){
    const bob=Math.sin(now/420)*R*.05;
    bubble(pipeX,pipeY+bob,R*.94,G.cur.s,G.cur.col);
    if(G.activeItem){
      const icon=G.activeItem==='bomb'?'💣':'🌈';
      ctx.save();
      ctx.font=`${R*.62}px sans-serif`;
      ctx.textAlign='center';ctx.textBaseline='middle';
      ctx.fillText(icon, pipeX+R*0.78, pipeY+bob-R*0.78);
      ctx.restore();
    }
  }
}
function renderTargetBar(){
  const bar=document.getElementById('targetBar');
  if(!bar)return;
  if(G.mode==='theme'&&G.targets.length){
    bar.style.display='flex';
    bar.innerHTML=G.targets.map(w=>`<span class="tchip${G.done[w]?' done':''}">${G.done[w]?'✓ ':''}${w}</span>`).join('');
  }else if(G.mode==='free'){
    bar.style.display='flex';
    const pct=Math.min(100,Math.round(G.wordsCompleted/G.freeGoal*100));
    bar.innerHTML=`<span class="tchip${G.wordsCompleted>=G.freeGoal?' done':''}">목표: 단어 ${G.wordsCompleted}/${G.freeGoal}개 완성</span>`;
  }else{
    bar.style.display='none'; bar.innerHTML='';
  }
}
function drawQueue(){
  if(!G.queue.length)return;
  const x=W/2 + R*2.8, y=G.shooterY + R*0.3, r=R*.82;
  ctx.save();
  ctx.font=`800 ${R*.48}px 'Pretendard', sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.fillStyle='#ffffff';ctx.shadowColor='rgba(0,0,0,.8)';ctx.shadowBlur=6;
  ctx.fillText('다음: '+G.queue[0].s,x,y-r*1.6);
  ctx.restore();
  neon('#c8962f',6,2,()=>{ctx.beginPath();ctx.arc(x,y,r*1.12,0,7);ctx.stroke();});
  bubble(x,y,r*.92,G.queue[0].s,G.queue[0].col);
}
function trajectory(angle){
  let x=W/2,y=G.shooterY,vx=Math.cos(angle)*R*.62,vy=Math.sin(angle)*R*.62;
  const pts=[];
  for(let i=0;i<200;i++){
    x+=vx;y+=vy;
    if(y<BY+BH){ if(x<BX+R){x=BX+R;vx*=-1;} if(x>BX+BW-R){x=BX+BW-R;vx*=-1;} }
    if(y<=BY+R)break;
    if(y<BY+BH&&hitsBubble(x,y))break;
    if(i%4===0)pts.push([x,y]);
  }
  return pts;
}
function draw(now){
  ctx.clearRect(0,0,W,H);
  ctx.save();
  if(G.shake>0.3){
    const dx=(Math.random()-0.5)*G.shake, dy=(Math.random()-0.5)*G.shake;
    ctx.translate(dx,dy);
  }
  drawBoard();

  if(G.aim!=null&&!G.fly&&!G.locked){
    if(G.trajA!==G.aim){G.trajA=G.aim;G.trajPts=trajectory(G.aim);}
    const pts=G.trajPts;
    ctx.save();ctx.fillStyle='#f0d896';ctx.shadowColor='#c8962f';ctx.shadowBlur=8;
    pts.forEach((p,i)=>{ctx.beginPath();ctx.arc(p[0],p[1],R*.13*(1-i/pts.length*.5),0,7);ctx.fill();});
    if(pts.length>2){
      const a=pts[pts.length-1],b2=pts[pts.length-2];
      const ang=Math.atan2(a[1]-b2[1],a[0]-b2[0]);
      ctx.translate(a[0],a[1]);ctx.rotate(ang+Math.PI/2);
      ctx.beginPath();
      ctx.moveTo(0,-R*.42);ctx.lineTo(R*.30,R*.18);ctx.lineTo(-R*.30,R*.18);
      ctx.closePath();ctx.fill();
    }
    ctx.restore();
  }
  if(G.hintCells){
    ctx.save();
    const pulse=.5+.5*Math.sin(now/180);
    ctx.strokeStyle=`rgba(255,232,140,${.5+pulse*.5})`;ctx.shadowColor='#ffe08c';ctx.shadowBlur=14;
    ctx.lineWidth=4;ctx.setLineDash([7,7]);
    for(const [c,r] of G.hintCells){ctx.beginPath();ctx.arc(cx(c,r),cy(r),R*1.05,0,7);ctx.stroke();}
    ctx.restore();
  }

  for(let r=0;r<G.grid.length;r++)
    for(let c=0;c<cellsIn(r);c++){
      const b=at(c,r); if(!b)continue;
      let rr=R*.94;
      if(b.born){const t=Math.min(1,(now-b.born)/220);rr=R*.94*(.62+.38*t+.12*Math.sin(t*Math.PI));}
      let bx=cx(c,r), by=cy(r);
      if(b.nope){
        const dt=now-b.nope;
        if(dt<400){ bx+=Math.sin(dt/28)*Math.max(0,4-dt/100); }
        else b.nope=0;
      }
      bubble(bx,by,rr,b.s,b.col,!!b.glow,b.special);
    }
  if(G.fly)bubble(G.fly.x,G.fly.y,R*.94,G.fly.s,G.fly.col);

  // 파티클 그리기
  for(let i=0; i<MAX_PARTICLES; i++){
    const p = PARTICLE_POOL[i];
    if(p.active){
      ctx.globalAlpha=Math.max(0,p.life);
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,7);
      ctx.fillStyle=p.col;ctx.shadowColor=p.col;ctx.shadowBlur=12;
      ctx.fill();ctx.shadowBlur=0;
    }
  }
  ctx.globalAlpha=1;

  drawShooter(now);
  drawQueue();

  if(G.banner){
    const b=G.banner, t=1-b.life/(b.big?1.6:1);
    const pop=t<.18?(t/.18):1;
    const bigMul=b.big?1.5:1;
    const fs=Math.min(R*2.0*bigMul,BW/(b.text.length+0.45)*bigMul)*(0.72+0.28*pop)*(1+(1-b.life)*0.06);
    const col=b.bonus?'#ffd86f':'#ff8fdc';
    ctx.save();
    ctx.globalAlpha=Math.min(1,b.life*2.2);
    ctx.translate(W/2,BY+R*1.25-(1-b.life)*R*.8);
    if(b.big){ const rot=Math.sin(performance.now()/90)*0.04; ctx.rotate(rot); }
    ctx.font=`800 ${fs}px 'Pretendard', sans-serif`;
    ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.shadowColor=col;ctx.shadowBlur=fs*(b.big?0.8:0.55);
    ctx.fillStyle=col;ctx.fillText(b.text,0,0);ctx.fillText(b.text,0,0);
    if(b.big) ctx.fillText(b.text,0,0);
    ctx.shadowBlur=0;
    ctx.fillStyle='#ffffff';ctx.fillText(b.text,0,0);
    ctx.restore();
  }
  for(const w of G.waves){
    ctx.save();
    ctx.globalAlpha=Math.max(0,w.life)*0.6;
    ctx.strokeStyle=w.col; ctx.shadowColor=w.col; ctx.shadowBlur=14;
    ctx.lineWidth=Math.max(1.5,3*w.life);
    ctx.beginPath(); ctx.arc(w.x,w.y,w.r,0,7); ctx.stroke();
    ctx.restore();
  }
  for(const p of G.pops){
    ctx.save();
    ctx.globalAlpha=Math.min(1,p.life*1.5);
    ctx.translate(p.x, p.y+(1-p.life)*-30);
    const fs=R*0.7*(0.85+(1-p.life)*0.35);
    ctx.font=`800 ${fs}px 'Pretendard', sans-serif`;
    ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillStyle=p.col; ctx.shadowColor=p.col; ctx.shadowBlur=fs*0.6;
    ctx.fillText(p.text,0,0);
    ctx.restore();
  }
  for(const t of G.toasts){
    ctx.save();
    ctx.globalAlpha=Math.min(1,t.life*1.6);
    ctx.translate(t.x,t.y-(1-t.life)*62);
    const fs=R*.74*(1+(1-t.life)*.25);
    ctx.font=`800 ${fs}px 'Pretendard', sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.fillStyle='#fff6d0';ctx.shadowColor='#ffd86f';ctx.shadowBlur=fs*.7;
    ctx.fillText(t.text,0,0);ctx.fillText(t.text,0,0);
    ctx.restore();
  }
  ctx.restore();
  
  if(G.flash>0.01){
    ctx.save();
    ctx.globalAlpha=G.flash;
    ctx.fillStyle='#ffffff';
    ctx.fillRect(0,0,W,H);
    ctx.restore();
  }

  // ✨ 피버 타임
  if (G.combo >= 3) {
    ctx.save();
    const pulse = 0.5 + 0.5 * Math.sin(performance.now() / 150);
    ctx.lineWidth = 14;
    ctx.strokeStyle = `rgba(255, 177, 92, ${pulse * 0.7})`;
    ctx.strokeRect(0, 0, W, H);
    ctx.restore();
  }
}
function tick(now){
  stepFly();
  for(let i=0; i<MAX_PARTICLES; i++) {
    const p = PARTICLE_POOL[i];
    if(p.active) { p.x+=p.vx; p.y+=p.vy; p.vy+=.22; p.life-=.028; if(p.life<=0) p.active=false; }
  }
  if(G.banner){G.banner.life-=.0085;if(G.banner.life<=0)G.banner=null;}
  for(const t of G.toasts)t.life-=.012;
  G.toasts=G.toasts.filter(t=>t.life>0);
  G.shake*=0.82; if(G.shake<0.3)G.shake=0;
  G.flash*=0.86; if(G.flash<0.01)G.flash=0;
  for(const w of G.waves){ w.r+=(w.maxR-w.r)*0.18; w.life-=0.05; }
  G.waves=G.waves.filter(w=>w.life>0);
  for(const p of G.pops){ p.y+=p.vy; p.vy*=0.94; p.life-=0.022; }
  G.pops=G.pops.filter(p=>p.life>0);
  draw(now);
  requestAnimationFrame(tick);
}

/* ---------- 입력 ---------- */
function aimAt(px,py){
  const dx=px-W/2,dy=py-G.shooterY;
  let a=Math.atan2(dy,dx);
  const lim=.22;
  if(a>-lim)a=-lim;
  if(a<-Math.PI+lim)a=-Math.PI+lim;
  G.aim=a;
}
function localPt(e){
  const rect=cv.getBoundingClientRect();
  return [e.clientX-rect.left,e.clientY-rect.top];
}
cv.addEventListener('pointerdown',e=>{G.dragging=true;aimAt(...localPt(e));});
cv.addEventListener('pointermove',e=>{if(G.dragging)aimAt(...localPt(e));});
cv.addEventListener('pointerup',()=>{
  if(!G.dragging)return;
  G.dragging=false;
  if(G.aim!=null)shoot(G.aim);
  G.aim=null;
});
cv.addEventListener('pointercancel',()=>{G.dragging=false;G.aim=null;});

document.getElementById('btnSwap').onclick=()=>{
  if(G.swaps<=0||G.fly||G.locked)return;
  SFX.click();
  G.swaps--; const t=G.cur; G.cur=G.queue[0]; G.queue[0]=t; syncUI();
};
document.getElementById('btnHint').onclick=()=>{
  if(G.hints<=0||G.fly||G.locked)return;
  SFX.click();
  const hit=completionsFor(G.cur.s);
  if(!hit.length){toast('이 글자로는 만들 단어가 없어요');return;}
  hit.sort((a,b)=>(b.cat===G.goal)-(a.cat===G.goal)||b.word.length-a.word.length);
  G.hints--; G.hintCells=[[hit[0].c,hit[0].r]];
  toast(hit[0].word,[[hit[0].c,hit[0].r]]);
  syncUI();
};
document.getElementById('btnBomb').onclick=()=>{
  if(G.bombs<=0||G.fly||G.locked)return;
  SFX.click();
  G.activeItem = G.activeItem==='bomb' ? null : 'bomb';
  syncUI();
};
document.getElementById('btnRainbow').onclick=()=>{
  if(G.rainbows<=0||G.fly||G.locked)return;
  SFX.click();
  G.activeItem = G.activeItem==='rainbow' ? null : 'rainbow';
  syncUI();
};
document.getElementById('btnMenu').onclick=()=>{
  if(veil.classList.contains('on'))return;
  G.locked=true;
  const info = `<p>주제: <b>${G.goal}</b> · 스테이지 ${G.stage}</p>
       <div>${G.targets.map(w=>`<span class="chip" style="${G.done[w]?'border-color:#7cffb2;color:#eafff3;text-shadow:0 0 8px #7cffb2':''}">${G.done[w]?'✓ ':''}${w}</span>`).join('')}</div>`;
  show(`<h2>메뉴</h2>
    ${info}
    <button class="btn" id="go">이어서 하기</button>
    <p style="margin-top:12px;font-size:14px">
      <a href="#" id="switch" style="color:#d9a94a">🗺️ 지도로 이동</a>
      &nbsp;·&nbsp;
      <a href="#" id="restart" style="color:#ff9a5c">이 스테이지 재시작</a>
    </p>
    <button class="btn" id="goShop" style="margin-top:10px;border-color:#ffd86f;color:#fff6d8;text-shadow:0 0 8px #ffd86f;box-shadow:0 0 14px rgba(255,216,111,.5),inset 0 0 12px rgba(255,216,111,.22);padding:9px 22px;font-size:15px">🛒 상점 (💰${(SAVE.coins||0).toLocaleString()})</button>`);
  document.getElementById('go').onclick=()=>{hide();G.locked=false;};
  document.getElementById('switch').onclick=ev=>{
    ev.preventDefault();hide();openMap();
  };
  document.getElementById('restart').onclick=ev=>{
    ev.preventDefault();if(!spendLife())return;hide();startGame(false, G.stage);
  };
  document.getElementById('goShop').onclick=()=>{ SFX.click(); openShop(); };
};
document.getElementById('btnShop').onclick=()=>{
  if(veil.classList.contains('on'))return;
  G.locked=true; SFX.click(); openShop();
};

/* ---------- UI ---------- */
function syncUI(){
  document.getElementById('uiStage').textContent=G.stage;
  const ul=document.getElementById('uiLives'); if(ul) ul.textContent=computeLives().count;
  const uc=document.getElementById('uiCoins'); if(uc) uc.textContent=(SAVE.coins||0).toLocaleString();
  const usb=document.getElementById('uiScoreBig'); if(usb) usb.textContent=G.score.toLocaleString();
  document.getElementById('uiGoal').textContent=G.goal;
  document.getElementById('uiCombo').textContent='x'+Math.max(1,Math.min(G.combo,5));
  document.getElementById('uiSwap').textContent=G.swaps;
  document.getElementById('uiHint').textContent=G.hints;
  renderTargetBar();
  const cb=document.getElementById('comboBar');
  if(cb)cb.style.width=(Math.min(G.combo,5)/5*100)+'%';
  saveGame(false);
  document.getElementById('btnSwap').disabled=G.swaps<=0;
  document.getElementById('btnHint').disabled=G.hints<=0;
  const ub=document.getElementById('uiBomb'), ur=document.getElementById('uiRainbow');
  if(ub) ub.textContent=G.bombs;
  if(ur) ur.textContent=G.rainbows;
  const bBomb=document.getElementById('btnBomb'), bRain=document.getElementById('btnRainbow');
  if(bBomb){ bBomb.disabled=G.bombs<=0; bBomb.classList.toggle('active', G.activeItem==='bomb'); }
  if(bRain){ bRain.disabled=G.rainbows<=0; bRain.classList.toggle('active', G.activeItem==='rainbow'); }
}
const veil=document.getElementById('veil'),card=document.getElementById('card');
function show(html){card.innerHTML=html;veil.classList.add('on');}
function hide(){veil.classList.remove('on');}
const SHOP_ITEMS=[
  {id:'hint3',   icon:'💡', label:'힌트 +3',   desc:'막힐 때 자리를 알려줘요',        price:30, apply:()=>{G.hints+=3;}},
  {id:'swap3',   icon:'🔄', label:'교체 +3',   desc:'글자를 다른 글자로 바꿔요',      price:20, apply:()=>{G.swaps+=3;}},
  {id:'bomb2',   icon:'💣', label:'폭탄 +2',   desc:'주변까지 한번에 터뜨려요',       price:50, apply:()=>{G.bombs+=2;}},
  {id:'rainbow2',icon:'🌈', label:'무지개 +2', desc:'가장 좋은 글자로 자동 발사',     price:60, apply:()=>{G.rainbows+=2;}},
  {id:'revive1', icon:'❤️', label:'부활권 +1', desc:'게임오버 시 이어서 플레이',      price:80, apply:()=>{SAVE.revives=(SAVE.revives||0)+1;}}
];
function openShop(){
  show(shopHTML());
  wireShop();
}
function shopHTML(){
  const coins=SAVE.coins||0;
  const rows=SHOP_ITEMS.map(it=>{
    const affordable=coins>=it.price;
    const owned = it.id==='revive1' ? `<span style="font-size:12px;opacity:.7">보유 ${SAVE.revives||0}</span>` : '';
    return `<div style="display:flex;align-items:center;gap:10px;padding:9px 4px;border-bottom:1px solid rgba(95,216,255,.15)">
      <div style="font-size:24px">${it.icon}</div>
      <div style="flex:1;text-align:left">
        <div style="font-size:15px;color:#eafcff">${it.label} ${owned}</div>
        <div style="font-size:12px;opacity:.65">${it.desc}</div>
      </div>
      <button class="btn" data-id="${it.id}" style="margin:0;padding:7px 14px;font-size:13px;${affordable?'':'opacity:.35'}"
        ${affordable?'':'disabled'}>💰${it.price}</button>
    </div>`;
  }).join('');
  return `<h2>🛒 상점</h2>
    <p style="font-size:14px;margin-top:-4px">보유 코인 <b style="color:#ffe08c">💰${coins.toLocaleString()}</b></p>
    <div style="max-height:52vh;overflow-y:auto;margin-top:8px">${rows}</div>
    <button class="btn" id="shopClose" style="margin-top:14px">닫기</button>`;
}
function wireShop(){
  card.querySelectorAll('button[data-id]').forEach(btn=>{
    btn.onclick=()=>{
      const it=SHOP_ITEMS.find(x=>x.id===btn.dataset.id);
      if(!it) return;
      const coins=SAVE.coins||0;
      if(coins<it.price) return;
      SAVE.coins=coins-it.price;
      it.apply();
      saveGame(true);
      SFX.buy();
      syncUI();
      show(shopHTML()); wireShop();
    };
  });
  document.getElementById('shopClose').onclick=()=>{ SFX.click(); hide(); G.locked=false; };
}
function calcStars(){
  const goal = G.mode==='theme' ? G.targets.length : G.freeGoal;
  const idealShots = Math.max(goal, Math.ceil(goal*1.3));
  const shots = Math.max(1, G.shots);
  const ratio = idealShots/shots;
  if(ratio>=0.85) return 3;
  if(ratio>=0.55) return 2;
  return 1;
}
function starRow(n){
  let out='';
  for(let i=0;i<3;i++) out+= i<n ? '<span style="color:#ffe08c;text-shadow:0 0 12px #ffb15c">★</span>' : '<span style="color:rgba(255,255,255,.25)">★</span>';
  return `<div style="font-size:34px;letter-spacing:6px;margin:8px 0">${out}</div>`;
}
function win(){
  G.locked=true;G.score+=1000;
  const stars=calcStars();
  const isMilestone = G.mode==='theme' && G.stage%MILESTONE_EVERY===0;
  const isFinal = G.mode==='theme' && G.stage===MAX_STAGE;
  const milestoneBonus = isFinal?1000:(isMilestone?200:0);
  const coinGain = 30 + G.stage*4 + stars*15 + milestoneBonus;
  SAVE.coins=(SAVE.coins||0) + coinGain;
  if(G.mode==='theme'){
    if(!SAVE.theme.levelStars) SAVE.theme.levelStars={};
    const prev=SAVE.theme.levelStars[G.stage]||0;
    if(stars>prev){ SAVE.totalStars=(SAVE.totalStars||0) + (stars-prev); SAVE.theme.levelStars[G.stage]=stars; }
  }else{
    SAVE.totalStars=(SAVE.totalStars||0) + stars;
  }
  saveGame(true);
  SFX.stageClear();
  addShake(8+stars*2); flash(0.3);
  let extra='';
  if(G.mode==='theme'){
    if(isFinal){
      extra=`<p>🏆 100 스테이지를 모두 완주했어요!</p><p style="font-size:14px;opacity:.85">정말 대단해요. 계속해서 도전할 수 있어요.</p>`;
    }else if(isMilestone){
      extra=`<p>🎁 마일스톤 달성! 보너스 코인 +${milestoneBonus}</p>`;
    }else{
      const nextGoal=CATS[(G.stage)%CATS.length];
      extra=`<p>목표 단어를 모두 만들었어요 🎉</p>
        <p style="margin-top:8px;font-size:14px;opacity:.85">다음 주제: <b>${nextGoal}</b></p>`;
    }
  }else{
    extra=`<p>목표 단어 개수를 달성했어요 🎉</p>`;
  }
  const mapBtn = G.mode==='theme' ? `<a href="#" id="toMap" style="display:block;margin-top:10px;color:#d9a94a;font-size:14px">🗺️ 지도로 보기</a>` : '';
  const nextBtnLabel = isFinal ? '한번 더 플레이' : '다음 스테이지';
  show(`<h2>스테이지 ${G.stage} 완료!</h2>
    ${starRow(stars)}
    ${extra}
    <p>점수 <b>${G.score.toLocaleString()}</b> · 💰+${coinGain}</p>
    <button class="btn" id="go">${nextBtnLabel}</button>
    ${mapBtn}`);
  document.getElementById('go').onclick=()=>{
    SFX.click();
    if(G.mode==='theme'){ G.stage=Math.min(G.stage+1, MAX_STAGE); }
    else{ G.stage++; }
    hide();G.locked=false;buildStage();saveGame(true);
  };
  const toMapBtn=document.getElementById('toMap');
  if(toMapBtn) toMapBtn.onclick=(ev)=>{ ev.preventDefault(); SFX.click(); hide(); G.locked=true; openMap(); };
}
function reviveBoard(){
  for(let i=0;i<2 && G.grid.length>0;i++) G.grid.pop();
  BOARDLAYER=null;
  toast('❤️ 부활! 아래 두 줄이 사라졌어요');
  checkState();
  syncUI();
}
function lose(){
  G.locked=true;
  SFX.gameOver();
  const canRevive=(SAVE.revives||0)>0;
  show(`<h2>아쉬워요!</h2>
    <p>버블이 바닥까지 내려왔어요.<br>스테이지 ${G.stage} · ${G.score.toLocaleString()}점</p>
    ${canRevive?`<button class="btn" id="revive" style="border-color:#ff6b81;color:#ffe0e6;text-shadow:0 0 10px #ff6b81;box-shadow:0 0 16px rgba(255,107,129,.55),inset 0 0 14px rgba(255,107,129,.25);margin-top:14px">❤️ 부활권 사용 (보유 ${SAVE.revives})</button>`:''}
    <button class="btn" id="go" style="margin-top:${canRevive?10:16}px">다시 하기</button>`);
  if(canRevive){
    document.getElementById('revive').onclick=()=>{
      SFX.buy();
      SAVE.revives--; saveGame(true);
      hide(); G.locked=false;
      reviveBoard();
    };
  }
  document.getElementById('go').onclick=()=>{if(!spendLife())return;hide();G.locked=false;G.score=0;buildStage();};
}
function intro(){
  const bestLine = SAVE.theme.bestScore
    ? `<p style="font-size:13px;opacity:.75;margin-top:6px">최고점수 <b>${(SAVE.theme.bestScore||0).toLocaleString()}</b></p>
       <p style="font-size:13px;opacity:.8;margin-top:2px">⭐ 모은 별 <b style="color:#ffe08c">${SAVE.totalStars||0}</b>개</p>`
    : '';
  show(`<h2>낱글자 팡팡!</h2>
    <p>버블을 쏘아 <b>가로·대각선</b>으로<br>낱글자를 이어 단어를 만들면 팡!</p>
    ${bestLine}
    <button class="btn" id="mTheme" style="display:block;margin:16px auto 0;font-size:20px;padding:14px 32px">🗺️ 모험 시작하기</button>
    <p style="font-size:13px;opacity:.7;margin:6px 0 0">주제별 목표 단어를 완성하며 100단계까지! (계속 늘어날 예정)</p>`);
  document.getElementById('mTheme').onclick=()=>{ SFX.click(); G.mode='theme'; hide(); openMap(); };
}
let _mapLivesTimer=null;
function renderMapLives(){
  const el=document.getElementById('mapLives'); if(!el)return;
  const s=computeLives();
  if(s.count>=MAX_LIVES){ el.innerHTML=`❤️ ${s.count}/${MAX_LIVES}`; return; }
  const sec=Math.ceil(secToNextLife());
  const mm=Math.floor(sec/60), ss=sec%60;
  el.innerHTML=`❤️ ${s.count}/${MAX_LIVES} <small>${mm}:${String(ss).padStart(2,'0')}</small>`;
}
const LEAF_POINTS={
  forest: [
    [30.44, 94.96],[33.78, 92.47],[35.90, 90.30],[42.31, 89.16],[50.15, 88.40],[57.45, 87.55],[65.02, 86.92],[71.77, 85.50],[69.38, 83.61],[62.56, 82.50],
    [54.99, 81.97],[47.97, 81.08],[41.63, 80.08],[35.90, 78.69],[32.69, 76.45],[35.42, 74.52],[42.31, 73.39],[49.95, 72.63],[57.79, 72.13],[64.95, 70.67],
    [62.70, 68.72],[55.95, 67.30],[48.85, 66.54],[42.17, 65.60],[35.90, 64.43],[32.56, 62.22],[37.94, 60.39],[45.85, 59.48],[53.29, 58.43],[60.17, 56.98],
    [63.52, 54.52],[58.88, 52.57],[51.10, 51.59],[43.60, 51.15],[36.92, 49.92],[33.17, 47.80],[37.81, 45.75],[45.31, 45.00],[53.36, 44.08],[60.99, 42.85],
    [65.02, 40.23],[59.49, 38.34],[52.20, 37.14],[44.49, 36.48],[36.78, 35.56],[33.58, 33.29],[39.65, 31.31],[46.67, 30.58],[54.58, 29.44],[61.20, 28.50],
    [65.02, 26.20],[62.63, 24.14],[56.29, 22.76],[48.92, 22.00],[41.22, 21.43],[35.42, 19.38],[41.28, 16.98],[48.92, 15.72],[54.86, 13.65],[57.79, 10.74],
    [50.90, 9.32],[44.01, 8.66],[36.17, 7.31],[47.76, 3.21]
  ]
};

const ZONES=[
  {key:'forest',   img:'assets/map_zone_forest.webp'}
];
function zoneIdx(lv){ return Math.min(4, Math.floor((lv-1)/100)); }
const PATH_POINTS={
  forest: [
    [58.33,99.31],[64.43,97.62],[51.48,96.65],[36.81,95.95],[37.76,94.58],[52.81,94.12],[66.52,93.36],[56.05,91.97],[41.38,91.32],[45.57,89.79],
    [58.33,88.69],[47.67,87.29],[33.76,86.96],[26.9,85.51],[41.19,84.95],[53.57,84.3],[47.29,82.96],[59.19,82.06],[74.67,81.28],[74.67,80.11],
    [59.67,79.63],[46.57,79.16],[46.81,77.82],[57.05,76.47],[41.1,75.67],[61.19,74.32],[54.33,73.03],[40.43,71.79],[46.9,70.61],[57.29,69.66],
    [68.24,68.61],[59.67,67.54],[48,66.87],[38.71,65.93],[38.48,64.48],[49.19,63.67],[59.67,62.93],[68.24,61.92],[59.43,61.05],[48.48,60.31],
    [39.19,59.57],[37.95,58.1],[49.76,57.35],[59.67,56.51],[57.76,55.07],[47.48,54.31],[40.14,53.06],[51.1,52.22],[58.71,51.28],[46.33,50.51],
    [60.62,49.52],[53.95,48.21],[43.1,47.35],[37.95,45.71],[49.95,45.04],[57.76,44.04],[58.71,42.77],[48.62,41.92],[39.19,41.15],[39.9,39.77],
    [51.1,39.2],[61.1,38.46],[61.81,37.05],[50.38,36.31],[38.95,35.44],[45.38,34.26],[39.67,32.37],[55.29,33.29],[61,32.0],[50.33,31.06],
    [39.67,30.11],[48.43,28.82],[59.29,27.69],[57.57,26.4],[49.95,25.46],[56.43,24.6],[48.24,23.54],[25,22.82],[37.38,22.15],[48.43,21.45],
    [55.67,20.21],[47.67,19.08],[37.19,18.28],[28.81,17.15],[39.48,16.23],[50.33,15.48],[60.24,14.54],[59.1,13.09],[48.81,12.47],[40.43,11.55],
    [33.95,8.59],[48.24,10.13],[58.33,9.16],[63.29,7.92],[52.62,7.09],[41.57,6.23],[31.1,5.58],[25.19,4.64],[37.29,4.35],[45.62,3.28]
  ]
};
const PATH_IMG_ASPECT={ forest: 6398/900 };

const FOREST_SUBIMAGES=[
  {file:'assets/bg_ch4.webp?v=2', topFrac:0,                 hFrac:0.2499218505783057},
  {file:'assets/bg_ch3.webp?v=2', topFrac:0.2499218505783057, hFrac:0.25023444826508284},
  {file:'assets/bg_ch2.webp?v=2', topFrac:0.5001562988433885, hFrac:0.2499218505783057},
  {file:'assets/bg_ch1.webp?v=2', topFrac:0.7500781494216943, hFrac:0.2499218505783057}
];

function openMap(_isRetry){
  document.getElementById('mapVeil').classList.add('on');
  const stars=SAVE.theme.levelStars||{};
  let maxUnlocked=1;
  for(let i=1;i<=MAX_STAGE;i++){ if(stars[i]!=null) maxUnlocked=i+1; }
  maxUnlocked=Math.min(maxUnlocked, MAX_STAGE);
  const allCleared = maxUnlocked>=MAX_STAGE && stars[MAX_STAGE]!=null;
  const TOTAL=Math.min(MAX_STAGE, Math.max(maxUnlocked+6, 12));
  const scrollEl=document.getElementById('mapScroll');
  const SPACING=108;
  const TOPPAD=60, BOTPAD=60;
  const containerW=scrollEl.clientWidth||390;
  const curZone=zoneIdx(TOTAL);

  function seeded(lv){ const x=Math.sin(lv*12.9898)*43758.5453; return x-Math.floor(x); }
  function xPct(lv){
    const wave=Math.sin(lv*0.9)*26;
    const jitter=(seeded(lv)-0.5)*10;
    return 50+wave+jitter;
  }

  const zoneH=[];
  for(let z=0; z<=curZone; z++){
    const key=ZONES[z].key;
    zoneH[z] = PATH_POINTS[key] ? containerW*PATH_IMG_ASPECT[key] : 100*SPACING;
  }
  const H = zoneH.reduce((a,b)=>a+b,0) + TOPPAD + BOTPAD;
  const zoneTop=[], zoneBot=[];
  { let bot=H-BOTPAD;
    for(let z=0; z<=curZone; z++){ zoneBot[z]=bot; zoneTop[z]=bot-zoneH[z]; bot=zoneTop[z]; } }

  function nodePos(lv){
    const z=zoneIdx(lv);
    const key=ZONES[z].key;
    const localLv=lv-z*100;
    if(PATH_POINTS[key]){
      const raw=PATH_POINTS[key][localLv-1] || [50,50];
      return { x: raw[0], y: zoneTop[z] + (raw[1]/100)*zoneH[z] };
    }else{
      const y = zoneBot[z] - (localLv-0.5)/100*zoneH[z];
      return { x: xPct(lv), y };
    }
  }

  let zonesHtml='';
  for(let z=0; z<=curZone; z++){
    const key=ZONES[z].key;
    if(key==='forest'){
      FOREST_SUBIMAGES.forEach(sub=>{
        const subTop = zoneTop[z] + sub.topFrac*zoneH[z];
        const subH = sub.hFrac*zoneH[z];
        zonesHtml += `<img src="${sub.file}" style="position:absolute;left:0;top:${subTop}px;width:100%;height:${subH}px;z-index:0;pointer-events:none">`;
      });
    }else if(PATH_POINTS[key]){
      zonesHtml += `<img src="${ZONES[z].img}" style="position:absolute;left:0;top:${zoneTop[z]}px;width:100%;height:${zoneH[z]}px;z-index:0;pointer-events:none">`;
    }else{
      zonesHtml += `<div style="position:absolute;left:0;top:${zoneTop[z]}px;width:100%;height:${zoneH[z]}px;overflow:hidden;
        background-image:url('${ZONES[z].img}');background-repeat:repeat-y;background-size:100% auto;background-position:top center"></div>`;
    }
  }

  let nodesHtml='';
  let pathPts=[];
  for(let lv=1; lv<=TOTAL; lv++){
    const done = stars[lv]!=null;
    const isNext = !done && lv===maxUnlocked;
    const locked = !done && !isNext;
    const isMilestone = lv%MILESTONE_EVERY===0;
    const isFinal = lv===MAX_STAGE;
    const cls = done?'done':(isNext?'next':'locked');
    const extraCls = isFinal?' mfinal':(isMilestone?' mmilestone':'');
    const p=nodePos(lv);
    pathPts.push([p.x,p.y]);
    const starSpots=[[-10,-1],[0,-5],[10,-1]];
    const starHtml = done ? starSpots.map((sp,i)=>
      `<span class="mstar" style="left:calc(50% + ${sp[0]}px);top:${sp[1]}px">${i<stars[lv]?'★':'<span style=\'opacity:.35\'>★</span>'}</span>`
    ).join('') : '';
    const icon = isFinal ? '👑' : (isMilestone ? '🎁' : lv);
    nodesHtml += `<div class="mnode ${cls}${extraCls}" data-lv="${lv}" style="left:${p.x}%;top:${p.y}px">
      ${done?'<span class="mdone-halo"></span>':''}
      ${locked?'<span class="mlock">🔒</span>':icon}
      ${starHtml}
    </div>`;
  }
  let pathD='';
  pathPts.forEach((p,i)=>{
    const [x,y]=p;
    if(i===0) pathD+=`M${x},${y}`;
    else{
      const [px,py]=pathPts[i-1];
      const midY=(py+y)/2;
      pathD+=` C${px},${midY} ${x},${midY} ${x},${y}`;
    }
  });
  const svg=`<svg viewBox="0 0 100 ${H}" preserveAspectRatio="none" style="position:absolute;left:0;top:0;width:100%;height:${H}px;z-index:1;pointer-events:none">
    <path d="${pathD}" fill="none" stroke="#fff3c4" stroke-width="0.7" stroke-linecap="round" stroke-dasharray="0.5 1.2" opacity="0.45" vector-effect="non-scaling-stroke"/>
  </svg>`;
  let html = `<div id="mapInner" style="height:${H}px">`;
  if(allCleared){
    html += `<div style="position:absolute;left:50%;top:${TOPPAD-40}px;transform:translateX(-50%);color:#f5e3ae;text-align:center;font-size:14px;padding:6px 16px;white-space:nowrap;z-index:3">🏆 100 스테이지 완주! 대단해요</div>`;
  }
  html += zonesHtml + svg + nodesHtml + '</div>';
  scrollEl.innerHTML=html;

  if(!_isRetry){
    requestAnimationFrame(()=>{
      const freshW = scrollEl.clientWidth;
      if(Math.abs(freshW - containerW) > 2){
        openMap(true);
        return;
      }
    });
  }

  renderMapLives();
  clearInterval(_mapLivesTimer);
  _mapLivesTimer=setInterval(renderMapLives,1000);
  const tabsEl=document.getElementById('seasonTabs');
  if(tabsEl){
    if(ZONES.length <= 1){
      tabsEl.innerHTML='';
    } else {
      let tabsHtml='';
      for(let z=0; z<ZONES.length; z++){
        const reachable = z<=curZone;
        tabsHtml += `<div class="stab ${reachable?'':'locked'}" data-z="${z}">S${z+1}</div>`;
      }
      tabsEl.innerHTML=tabsHtml;
      tabsEl.querySelectorAll('.stab').forEach(t=>{
        t.onclick=()=>{
          const z=+t.dataset.z;
          if(z>curZone) return;
          SFX.click();
          const targetY=(zoneTop[z]+zoneBot[z])/2;
          scrollEl.scrollTo({top: Math.max(0, targetY - scrollEl.clientHeight/2), behavior:'smooth'});
        };
      });
    }
  }
  requestAnimationFrame(()=>{
    const nextEl=scrollEl.querySelector('.mnode.next')||scrollEl.querySelector('.mnode.done:last-of-type');
    if(nextEl) nextEl.scrollIntoView({block:'center'});
  });
  scrollEl.querySelectorAll('.mnode').forEach(el=>{
    el.onclick=()=>{
      const lv=+el.dataset.lv;
      if(el.classList.contains('locked')) return;
      if(!spendLife()) return;
      SFX.click();
      document.getElementById('mapVeil').classList.remove('on');
      clearInterval(_mapLivesTimer);
      G.mode='theme';
      startGame(false, lv);
    };
  });
}
function startGame(resume, atStage){
  if(typeof atStage==='number'){
    G.stage=atStage; G.score=0;
  }else if(resume){
    const slot=SAVE[G.mode];
    G.stage=slot?Math.max(1,slot.stage):1;
    G.score=slot?(slot.score||0):0;
  }else{
    G.stage=1; G.score=0;
  }
  G.started=true;
  buildStage(); G.locked=false; saveGame(true);
}

/* ---------- 저장 (localStorage) ---------- */
const SAVE_KEY='pangpop_save_v1';
function loadSave(){
  try{
    const raw=localStorage.getItem(SAVE_KEY);
    if(!raw) return null;
    const d=JSON.parse(raw);
    if(!d.free) d.free={stage:1,score:0,bestScore:0,bestStage:1};
    if(!d.theme) d.theme={stage:1,score:0,bestScore:0,bestStage:1};
    if(typeof d.coins!=='number') d.coins=0;
    if(typeof d.revives!=='number') d.revives=0;
    if(typeof d.totalStars!=='number') d.totalStars=0;
    if(!d.theme.levelStars) d.theme.levelStars={};
    if(!d.lives) d.lives={count:6,lastUpdate:Date.now()};
    return d;
  }catch(e){ return null; }
}
let SAVE = loadSave() || {
  free:{stage:1,score:0,bestScore:0,bestStage:1},
  theme:{stage:1,score:0,bestScore:0,bestStage:1,levelStars:{}},
  lastMode:'theme', coins:0, revives:0, totalStars:0,
  lives:{count:6,lastUpdate:Date.now()}
};

/* ---------- 목숨(하트) 시스템 ---------- */
const MAX_LIVES=6, LIFE_REGEN_MS=60000;
function computeLives(){
  let s=SAVE.lives;
  if(!s){ s=SAVE.lives={count:MAX_LIVES,lastUpdate:Date.now()}; }
  if(s.count<MAX_LIVES){
    const now=Date.now();
    const elapsed=now-s.lastUpdate;
    const regen=Math.floor(elapsed/LIFE_REGEN_MS);
    if(regen>0){
      s.count=Math.min(MAX_LIVES, s.count+regen);
      s.lastUpdate+=regen*LIFE_REGEN_MS;
      if(s.count>=MAX_LIVES) s.lastUpdate=now;
    }
  }else{
    s.lastUpdate=Date.now();
  }
  return s;
}
function secToNextLife(){
  const s=computeLives();
  if(s.count>=MAX_LIVES) return 0;
  return Math.max(0, LIFE_REGEN_MS - (Date.now()-s.lastUpdate)) / 1000;
}
function spendLife(){
  const s=computeLives();
  if(s.count<=0){
    const sec=Math.ceil(secToNextLife());
    const mm=Math.floor(sec/60), ss=sec%60;
    show(`<h2>하트가 없어요 ❤️</h2>
      <p>다음 하트까지 <b>${mm}:${String(ss).padStart(2,'0')}</b></p>
      <p style="font-size:13px;opacity:.75;margin-top:6px">1분마다 하트가 하나씩 채워져요 (최대 ${MAX_LIVES}개)</p>
      <button class="btn" id="livesOk">확인</button>`);
    document.getElementById('livesOk').onclick=()=>{ SFX.click(); hide(); };
    return false;
  }
  s.count--; saveGame(true);
  return true;
}
let _saveTimer=null;
function saveGame(immediate){
  const write=()=>{
    try{
      const slot=SAVE[G.mode]||(SAVE[G.mode]={stage:1,score:0,bestScore:0,bestStage:1});
      slot.stage=G.stage; slot.score=G.score;
      slot.bestScore=Math.max(slot.bestScore||0, G.score);
      slot.bestStage=Math.max(slot.bestStage||1, G.stage);
      SAVE.lastMode=G.mode;
      localStorage.setItem(SAVE_KEY, JSON.stringify(SAVE));
    }catch(e){}
  };
  if(immediate){ clearTimeout(_saveTimer); write(); }
  else{ clearTimeout(_saveTimer); _saveTimer=setTimeout(write,500); }
}

/* ---------- 유틸 ---------- */
function pick(a){return a[Math.floor(Math.random()*a.length)];}
let _fillCount={};
function resetFillCount(){ _fillCount={}; }
function fillSyllable(c,r){
  const avoid=new Set();
  if(c>0 && G.grid[r] && G.grid[r][c-1]) avoid.add(G.grid[r][c-1].s);
  if(r>0){
    for(const [nc,nr] of nbrs(c,r)){
      if(nr<r && G.grid[nr] && G.grid[nr][nc]) avoid.add(G.grid[nr][nc].s);
    }
  }
  let candidates=G.pool.filter(s=>!avoid.has(s));
  if(!candidates.length) candidates=[...G.pool];
  let minUse=Infinity;
  for(const s of candidates) minUse=Math.min(minUse,_fillCount[s]||0);
  const leastUsed=candidates.filter(s=>(_fillCount[s]||0)<=minUse+1);
  const chosen=pick(leastUsed.length?leastUsed:candidates);
  _fillCount[chosen]=(_fillCount[chosen]||0)+1;
  return chosen;
}
function shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}

function syncMuteBtn(){
  const b=document.getElementById('btnMute');
  if(b) b.textContent = soundOn() ? '🔊' : '🔇';
}
document.getElementById('btnMute').onclick=()=>{
  SAVE.soundOn = !soundOn();
  try{ localStorage.setItem(SAVE_KEY, JSON.stringify(SAVE)); }catch(e){}
  syncMuteBtn();
  const bgm = document.getElementById('bgmAudio');
  if(bgm){
    if(soundOn()) { SFX.click(); bgm.play().catch(()=>{}); }
    else { bgm.pause(); }
  }
};
document.body.addEventListener('pointerdown', () => {
  const bgm = document.getElementById('bgmAudio');
  if (bgm && soundOn() && bgm.paused) {
    bgm.play().catch(()=>{});
  }
}, { once: true });

/* ---------- 시작 ---------- */
function applyDebugZones(){
  const targetMax=Math.max(1, MAX_STAGE-1);
  const ls=SAVE.theme.levelStars||(SAVE.theme.levelStars={});
  for(let i=1;i<=targetMax;i++){ if(ls[i]==null) ls[i]=3; }
}
function boot(){
  syncMuteBtn();
  resize();
  try{
    const params=new URLSearchParams(location.search);
    if(params.get('testmap')==='1') applyDebugZones();
  }catch(e){}
  G.grid=[]; G.targets=[]; G.cur=null; G.queue=[];
  G.locked=true; intro();
  requestAnimationFrame(tick);
  loadAssets().then(()=>{ BOARDLAYER=null; });
}
function markFontsReady(){ FONTS_READY=true; SPR.clear(); BOARDLAYER=null; }
if(document.fonts&&document.fonts.ready){
  boot();
  const need=[document.fonts.load("800 20px 'Pretendard'"),
              document.fonts.load("700 20px 'Pretendard'")];
  Promise.all(need).then(()=>document.fonts.ready).then(markFontsReady)
    .catch(()=>{ setTimeout(markFontsReady,800); });
  setTimeout(()=>{ if(!FONTS_READY) markFontsReady(); },2000);
} else { window.addEventListener('load',()=>{ boot(); setTimeout(markFontsReady,600); }); }