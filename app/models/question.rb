#Model for handling question related operations and validations
class Question < ApplicationRecord
  has_many :answers, dependent: :destroy
  validates :title, :contents, presence: true,
                  length: { minimum: 5 }
  #validates :askedby, presence: true

  def self.search(search)
   where("title LIKE ?", "%#{search}%")
   #where("contents LIKE ?", "%#{search}%")
  end

  def self.anscounthash(current_user)
  	Question.where(askedby: current_user.email).collect do |f|
  	# question.each do |f|
    	count = f.answers.find_all().count()
    	ques_ans_hash = {id: f.id, title: f.title, ans_count: count}
    	ques_ans_hash
  	end
  end

end