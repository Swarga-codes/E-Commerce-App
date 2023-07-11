export default function LimitPara(paragraph, wordLimit){
    let words = paragraph.split(' ');
    if (words.length <= wordLimit) {
      return paragraph;
    }
    let limitedWords = words.slice(0, wordLimit);
    return limitedWords.join(' ') + '...';
}