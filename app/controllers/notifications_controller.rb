class NotificationsController < ApplicationController

  def notify
    @notify = current_user.notifications.find_all()
    respond_to do |format|
      format.html # index.html.erb
      format.json { render :json => [@notify] }
    end
  end

  def remove
    @notify = current_user.notifications
    @notify.destroy_all
  end

end