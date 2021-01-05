// +-------------------------------------------------------------------------
// | Copyright (C) 2016 Yunify, Inc.
// +-------------------------------------------------------------------------
// | Licensed under the Apache License, Version 2.0 (the "License");
// | you may not use this work except in compliance with the License.
// | You may obtain a copy of the License in the LICENSE file, or at:
// |
// | http://www.apache.org/licenses/LICENSE-2.0
// |
// | Unless required by applicable law or agreed to in writing, software
// | distributed under the License is distributed on an "AS IS" BASIS,
// | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// | See the License for the specific language governing permissions and
// | limitations under the License.
// +-------------------------------------------------------------------------

import { fixedEncodeURIComponent, buildUri, isFunction, filterUnsafeHeaders } from './utils';

const keys = `test_object
中文测试
田中さんにあげて下さい
パーティーへ行かないか
和製漢語
사회과학원 어학연구소
찦차를 타고 온 펲시맨과 쑛다리 똠방각하
社會科學院語學研究所
울란바토르
𠜎𠜱𠝹𠱓𠱸𠲖𠳏
,./;'[]\-=
<>?:"{}\|_+
!@#$%^&*()\`~
'
"
''
""
'"'
"''''"'"
"'"'"''''"
😍
👩🏽
👾 🙇 💁 🙅 🙆 🙋 🙎 🙍
🐵 🙈 🙉 🙊
✋🏿 💪🏿 👐🏿 🙌🏿 👏🏿 🙏🏿
🚾 🆒 🆓 🆕 🆖 🆗 🆙 🏧
0️⃣ 1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣ 6️⃣ 7️⃣ 8️⃣ 9️⃣ 🔟
❤️ 💔 💌 💕 💞 💓 💗 💖 💘 💝 💟 💜 💛 💚 💙
１２３
١٢٣
ثم نفس سقطت وبالتحديد،/, جزيرتي باستخدام أن دنو. إذ هنا؟ الستار وتنصيب كان. أهّل ايطاليا،/ بريطانيا-فرنسا قد أخذ. سليمان، إتفاقية بين ما/, يذكر الحدود أي بعد, معاملة بولندا، الإطلاق عل إيو.
בְּרֵאשִׁית, בָּרָא אֱלֹהִים, אֵת הַשָּׁמַיִם, וְאֵת הָאָרֶץ
הָיְתָהtestالصفحات التّحول
﷽
ﷺ
مُنَاقَشَةُ سُبُلِ اِسْتِخْدَامِ اللُّغَةِ فِي النُّظُمِ الْقَائِمَةِ وَفِيم يَخُصَّ التَّطْبِيقَاتُ الْحاسُوبِيَّةُ،`;

test('fixedEncodeURIComponent', () => {
  keys.split('\n').forEach((key) => {
    expect(fixedEncodeURIComponent(key)).toMatchSnapshot();
  });
});

test('buildUri', () => {
  expect(buildUri('https://qingstor.com', '/test_bucet', { foo: 'bar' })).toMatchSnapshot();
  expect(buildUri('https://qingstor.com', '/test_bucet?cors', { foo: 'bar' })).toMatchSnapshot();
});

test('isFunction', () => {
  expect(isFunction(function () {})).toBe(true);
  expect(isFunction({ foo: 'bar' })).toBe(false);
});

test('filterUnsafeHeaders', () => {
  expect(
    filterUnsafeHeaders({
      host: 'qingstor.com',
      'x-qs-date': 'Fri, 01 Nov 2019 07:40:08 GMT',
      'content-length': 11,
      'content-type': 'image/jpeg',
      'x-qs-z': 'test-z',
      'x-qs-a': 'test-a',
      'x-qs-a-abc': 'test-abc',
      'user-agent': 'userAgent',
    })
  ).toMatchSnapshot();
});
