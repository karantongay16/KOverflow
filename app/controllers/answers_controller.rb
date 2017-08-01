# Handles all the operations that deal with creation,
# view and deletion of the answers
class AnswersController < ApplicationController

  def show
  end
  def index

    @question = Question.find(params[:question_id])
    @answer = @question.answers.find_all()

    respond_to do |format|
      format.html # index.html.erb
      format.json { render :json => [@answer] }
    end

  end
  def ncreate(question)
     print(question)
     @notification = current_user.notifications.create(contents: "New Answer Created")
  end
  def create

   @question = Question.find(params[:question_id])
   @answer = @question.answers.create(answer_params)

   #ncreate(@question) # Update in the notifications model
   @user = User.where(:email => @question.askedby)
   @notification = @user.notifications.create(contents: "New Answer submitted for " + @question.title)

   #@notification.save()

   #redirect_to question_path(@question)

   respond_to do |format|
      format.html # index.html.erb
      format.json { render :json => [current_user.email] }
    end

  end
  def destroy
    @question = Question.find(params[:question_id])
    @answer = @question.answers.find(params[:id])
    if @answer.answeredby != current_user.email
      flash[:notice] = "You cannot delete the answer written by other user!"
      redirect_to :back
    #redirect_back(fallback_location: root_path)
  else
    @answer.destroy
    #redirect_to question_path(@question)
  end
end

private
def answer_params
  params.require(:answer).permit(:poster, :contents, :answeredby)
end
end