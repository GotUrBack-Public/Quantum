# Guardian source layout

Planned submodules:

- `engine/`: local message evaluation entry point.
- `rules/`: deterministic, versioned rules.
- `scoring/`: severity and confidence bands.
- `report-draft/`: local evidence selection and preview model.
- `settings/`: local preference schema and defaults.

Keep this package platform-neutral. It must not perform network requests or access server credentials. Any report submission belongs to an explicit client workflow outside the classifier.
