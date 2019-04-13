import content from './content';

const url = 'https://nofluffjobs.com/job/senior-java-developer-7n-prwlpgc7?criteria=category%253Dbackend';


(async () => {
    console.log(await content(url));
})();