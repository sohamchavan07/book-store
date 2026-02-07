# frozen_string_literal: true

module ApplicationHelper
  # Check for an asset file in common asset locations so views can
  # decide whether to render image tags without calling asset pipeline APIs
  # which may not be present in all environments (Propshaft vs Sprockets).
  #
  # Examples:
  #   asset_exists?("logo.png") -> true/false
  #   asset_exists?("icon") -> checks icon.png, icon.svg, etc.
  def asset_exists?(name)
    return false if name.blank?

    name = name.to_s
    paths = direct_asset_paths(name)
    paths += extension_asset_paths(name) if File.extname(name).empty?

    paths.any? { |p| File.exist?(p) }
  end

  private

  def direct_asset_paths(name)
    [
      Rails.root.join('app', 'assets', 'images', name),
      Rails.root.join('app', 'assets', 'builds', name),
      Rails.root.join('public', 'assets', name)
    ]
  end

  def extension_asset_paths(name)
    %w[png jpg jpeg svg webp].flat_map do |ext|
      [
        Rails.root.join('app', 'assets', 'images', "#{name}.#{ext}"),
        Rails.root.join('public', 'assets', "#{name}.#{ext}")
      ]
    end
  end
end
