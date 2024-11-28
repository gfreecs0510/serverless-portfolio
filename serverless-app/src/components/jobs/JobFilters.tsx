import { FC, useEffect } from 'react'

const JobFilters: FC = () => {
  useEffect(() => {
    // Re-initialize FlyonUI dropdown after component mounts (if needed)
    const dropdown = document.querySelector('select')
    if (dropdown) {
      // Custom initialization for FlyonUI or other JS library
    }
  }, [])

  const options = [
    'United States of America',
    'Canada',
    'Singapore',
    'Japan',
    'United Kingdom',
  ]

  return (
    <div className="max-w-sm">
      <div className="label">
        <span className="label-text">Country</span>
      </div>
      <select
        data-select='{
  "placeholder": "Select country",
  "toggleTag": "<button type=\"button\" aria-expanded=\"false\"></button>",
  "toggleClasses": "advance-select-toggle",
  "hasSearch": true,
  "dropdownClasses": "advance-select-menu max-h-52 pt-0 vertical-scrollbar rounded-scrollbar",
  "optionClasses": "advance-select-option selected:active",
  "optionTemplate": "<div className=\"flex justify-between items-center w-full\"><span data-title></span><span className=\"icon-[tabler--check] flex-shrink-0 size-4 text-primary hidden selected:block \"></span></div>",
  "extraMarkup": "<span className=\"icon-[tabler--caret-up-down] flex-shrink-0 size-4 text-base-content/90 absolute top-1/2 end-3 -translate-y-1/2 \"></span>"
  }'
        className="hidden"
      >
        <option value="">Choose</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  )
}

export { JobFilters }
