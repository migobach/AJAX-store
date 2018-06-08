class ApplicationController < ActionController::Base
  before_action :set_product, only: [:show, :update, :destroy]

  def index
  end

  def form
  end

end
