// @flow

import React from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';

import { translate } from '../../../i18n';
import { StyleType } from '../../../styles';

import { _abstractMapStateToProps } from '../../functions';

import { type Props as BaseProps } from './BaseDialog';
import BaseSubmitDialog from './BaseSubmitDialog';

type Props = BaseProps & {

    /**
     * The color-schemed stylesheet of the feature.
     */
    _dialogStyles: StyleType,

    /**
     * Untranslated i18n key of the content to be displayed.
     *
     * NOTE: This dialog also adds support to Object type keys that will be
     * translated using the provided params. See i18n function
     * {@code translate(string, Object)} for more details.
     */
    contentKey: string | { key: string, params: Object},

    t: Function
}

/**
 * Implements a confirm dialog component.
 */
class OkDialog extends BaseSubmitDialog<Props, *> {
    /**
     * Returns the title key of the submit button.
     *
     * @returns {string}
     */
    _getSubmitButtonKey() {
        return this.props.okKey || 'dialog.confirmYes';
    }

    _onCancel: () => void;

    /**
     * Implements {@code BaseSubmitDialog._renderSubmittable}.
     *
     * @inheritdoc
     */
    _renderSubmittable() {
        if (this.props.children) {
            return this.props.children;
        }

        const { _dialogStyles, contentKey, t } = this.props;
        const content
            = typeof contentKey === 'string'
                ? t(contentKey)
                : this._renderHTML(t(contentKey.key, contentKey.params));

        return (
            <Text style = { _dialogStyles.text }>
                { content }
            </Text>
        );
    }

    _renderHTML: string => Object | string
}

export default translate(connect(_abstractMapStateToProps)(OkDialog));
