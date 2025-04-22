const scriptName = "출석체크봇";
let attendanceMap = {};

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  if (packageName && packageName !== "com.kakao.talk") return;

  // .출석 (닉네임 입력 없이, sender로 자동 처리)
  if (msg.trim() === ".출석") {
    if (!attendanceMap[room]) {
      attendanceMap[room] = [];
    }

    if (attendanceMap[room].includes(sender)) {
      replier.reply(`${sender}님은 이미 출석하셨습니다 ✅`);
    } else {
      attendanceMap[room].push(sender);
      replier.reply(`${sender}님이 출석체크를 했습니다 🎉`);
    }
    return;
  }

  // .출석확인
  if (msg === ".출석확인") {
    const list = attendanceMap[room] || [];
    if (list.length === 0) {
      replier.reply("아직 아무도 출석하지 않았습니다.");
    } else {
      replier.reply(`✅ 현재 출석자 명단 (${list.length}명):\n- ` + list.join("\n- "));
    }
  }

  // .출석초기화
  if (msg === ".출석초기화") {
    attendanceMap[room] = [];
    replier.reply("🔄 출석 명단이 초기화되었습니다.");
  }

  // .출석랭킹
  if (msg === ".출석랭킹") {
    let countMap = {};
    for (let roomName in attendanceMap) {
      const names = attendanceMap[roomName];
      for (let i = 0; i < names.length; i++) {
        const name = names[i];
        countMap[name] = (countMap[name] || 0) + 1;
      }
    }

    let entries = [];
    for (let name in countMap) {
      entries.push([name, countMap[name]]);
    }

    entries.sort((a, b) => b[1] - a[1]);

    if (entries.length === 0) {
      replier.reply("⚠️ 출석 기록이 없습니다.");
    } else {
      let message = "🏆 출석 랭킹 TOP 5:\n";
      for (let i = 0; i < Math.min(5, entries.length); i++) {
        const [name, count] = entries[i];
        message += `${i + 1}. ${name} (${count}회)\n`;
      }
      replier.reply(message.trim());
    }
  }
}
