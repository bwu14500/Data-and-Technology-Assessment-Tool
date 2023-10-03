import React from 'react';

class SurveyPage extends React.Component {
  constructor(props) {
    super(props);

    // Define survey questions as an array of objects
    this.state = {
      surveyQuestions: [
        {
          question: 'How satisfied are you with our service?',
          options: ['1', '2', '3', '4', '5'],
          answer: null, // Initialize the answer to null
        },
        {
          question: 'Would you recommend our product to others?',
          options: ['1', '2', '3', '4', '5'],
          answer: null, // Initialize the answer to null
        },
      ],
    };
  }

  // Calculate the percentage of questions answered
  calculateProgress = () => {
    const { surveyQuestions } = this.state;
    const answeredCount = surveyQuestions.filter(
      (question) => question.answer !== null
    ).length;
    const totalQuestions = surveyQuestions.length;
    return (answeredCount / totalQuestions) * 100;
  };

  // Function to handle option selection for each question
  handleOptionSelect = (questionIndex, selectedOption) => {
    const updatedQuestions = [...this.state.surveyQuestions];
    updatedQuestions[questionIndex].answer = selectedOption;
    this.setState({ surveyQuestions: updatedQuestions });
  };

  render() {
    const progress = this.calculateProgress();

    return (
      <div>
        <div className="progress-bar">
          Progress: {progress.toFixed(2)}%
          <div className="progress-bar-inner" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="survey-box">
          <h2>Technology Assessment</h2>
          <form>
            {this.state.surveyQuestions.map((surveyQuestion, index) => (
              <div key={index} className="question-container">
                <p>{surveyQuestion.question}</p>
                <div className="options">
                  {surveyQuestion.options.map((option, optionIndex) => (
                    <label key={optionIndex}>
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={option}
                        onChange={() => this.handleOptionSelect(index, option)}
                        checked={surveyQuestion.answer === option}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default SurveyPage;
