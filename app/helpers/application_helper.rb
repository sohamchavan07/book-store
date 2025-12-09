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

		candidates = []
		# Direct paths provided
		candidates << Rails.root.join("app", "assets", "images", name)
		candidates << Rails.root.join("app", "assets", "builds", name)
		candidates << Rails.root.join("public", "assets", name)

		# If no extension, try common image extensions
		if File.extname(name).empty?
			%w[png jpg jpeg svg webp].each do |ext|
				candidates << Rails.root.join("app", "assets", "images", "#{name}.#{ext}")
				candidates << Rails.root.join("public", "assets", "#{name}.#{ext}")
			end
		end

		candidates.any? { |p| File.exist?(p) }
	end
end
