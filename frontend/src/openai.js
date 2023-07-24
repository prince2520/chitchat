const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_KEY,
});

const openai = new OpenAIApi(config);

export const openAIAnswer = (question) => {
    return new Promise(function(resolve, reject) {
        try {
            openai.createCompletion({
                model: "text-davinci-003",
                prompt: question,
                max_tokens: 2048,
                temperature: 1,
            }).then(response=>{
                resolve(response.data.choices[0].text.slice(1));
            });
        }catch (err){
            reject(null);
        }
    });
};


