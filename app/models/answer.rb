class Answer < ApplicationRecord
  belongs_to :question
  validates :contents, presence: true,
  length: { minimum: 5 }

  def self.answershash(current_user)
  	questiontitle = ""
  	Answer.where(answeredby: current_user.email).collect do |f|
    	ques = Question.find(f.question_id)
    	ans_hash = {id: ques.id, contents: f.contents, question_title: ques.title, askedby: ques.askedby}
    	ans_hash
  	end
  end

end