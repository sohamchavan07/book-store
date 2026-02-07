# frozen_string_literal: true

class WelcomeEmailJob < ApplicationJob
  queue_as :default

  def perform(user_id)
    user = User.find(user_id)

    # Send email
    UserMailer.welcome_email(user).deliver_now

    # Store JobLog
    log_job_status('success', "Welcome email sent to #{user.email}")
  rescue StandardError => e
    log_job_status('failed', e.message)
    raise e
  end

  private

  def log_job_status(status, message)
    JobLog.create!(
      job_name: self.class.name,
      status: status,
      executed_at: Time.current,
      message: message
    )
  end
end
