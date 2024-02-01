const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI('AIzaSyBUgKxLqKawqMiBux7BQyaPzY8VnhTPM5E');


const app = express()

app.use(cors())
app.use(bodyParser.json())
// app.options('/generate-mail', cors());

app.post('/generate-mail', async(req, res) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  const prompt = req.body.prompt;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.json({text})
  } catch (error) {
    console.error('Error generation story', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.listen(3001, () => {
  console.log(`Server is running on port.`)
})

// const corsOptions = {
//   origin: 'http://localhost:5173',
//   // Other options if needed...
// };

// app.use(cors(corsOptions));



    