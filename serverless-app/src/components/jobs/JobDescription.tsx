import { FC } from 'react'

const JobDescription: FC = () => {
  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-2xl font-semibold text-base-content/90">
          Product Information
        </h3>
        <p className="mt-1 max-w-full text-base-content/80">
          Details of the latest product release.
        </p>
      </div>
      <div className="mt-6 border-t border-base-content/25">
        <dl className="divide-y divide-base-content/25">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-base">
            <dt className="font-medium text-base-content/90">Product Name</dt>
            <dd className="mt-1  text-base-content/80 sm:col-span-2 sm:mt-0">
              Flyon Django
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-base">
            <dt className="font-medium text-base-content/90">Category</dt>
            <dd className="mt-1  text-base-content/80 sm:col-span-2 sm:mt-0">
              Admin template
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-base">
            <dt className="font-medium text-base-content/90">Release Date</dt>
            <dd className="mt-1  text-base-content/80 sm:col-span-2 sm:mt-0">
              March 15, 2024
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-base">
            <dt className="font-medium text-base-content/90">Price</dt>
            <dd className="mt-1  text-base-content/80 sm:col-span-2 sm:mt-0">
              $499
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-base">
            <dt className="font-medium text-base-content/90">Description</dt>
            <dd className="mt-1  text-base-content/80 sm:col-span-2 sm:mt-0">
              The{' '}
              <span className="font-semibold text-base-content/90">
                Flyon – Bootstrap Django Admin Dashboard Template
              </span>{' '}
              – is the most developer friendly & highly customizable Admin
              Dashboard Template based on Bootstrap 5.
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-base">
            <dt className="font-medium text-base-content/90">Documents</dt>
            <dd className="mt-2 text-base-content/90 sm:col-span-2 sm:mt-0">
              <ul
                role="list"
                className="divide-y divide-base-content/25 rounded-md border border-base-content/25"
              >
                <li className="flex items-center justify-between py-4 ps-4 pe-5">
                  <div className="flex w-0 flex-1 items-center">
                    <span className="icon-[tabler--paperclip] size-5 flex-shrink-0"></span>
                    <div className="ms-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">
                        Flyon_Pro_User_Manual.pdf
                      </span>
                      <span className="flex-shrink-0 text-base-content/50">
                        3.2mb
                      </span>
                    </div>
                  </div>
                  <div className="ms-4 flex-shrink-0">
                    <a href="#" className="link link-primary">
                      Download
                    </a>
                  </div>
                </li>
                <li className="flex items-center justify-between py-4 ps-4 pe-5">
                  <div className="flex w-0 flex-1 items-center">
                    <span className="icon-[tabler--paperclip] size-5 flex-shrink-0"></span>
                    <div className="ms-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">
                        Flyon_Pro_Installation_Guide.pdf
                      </span>
                      <span className="flex-shrink-0 text-base-content/50">
                        5.1mb
                      </span>
                    </div>
                  </div>
                  <div className="ms-4 flex-shrink-0">
                    <a href="#" className="link link-primary">
                      Download
                    </a>
                  </div>
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

export { JobDescription }
